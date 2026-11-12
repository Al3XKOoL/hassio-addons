/**
 * Servidor de señalización - App Rutas GPS (master/esclavo)
 * Ejecuta en ARM64 Linux.
 *
 * Funciones:
 * 1. Valida la clave de servidor para permitir modo master.
 * 2. Genera claves de sesión temporales (6 dígitos).
 * 3. Empareja esclavos con un master mediante clave de sesión.
 * 4. Relé de mensajes entre master y esclavos mientras el servidor esté online.
 * 5. No almacena posiciones ni rutas permanente (solo sesiones activas en memoria).
 */

require('dotenv').config();
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = parseInt(process.env.PORT || '3000', 10);
const SERVER_MASTER_KEY = process.env.SERVER_MASTER_KEY || 'CAMBIA_ESTA_CLAVE';
const SESSION_TTL_MS = parseInt(process.env.SESSION_TTL_MS || '3600000', 10);

// Sesiones activas en memoria: sessionKey -> { masterId, createdAt, ttl, slaves: Set<deviceId> }
const sessions = new Map();

// Clientes conectados por WebSocket: ws -> { deviceId, role, nickname, carBrand, carModel, sessionKey }
const clients = new Map();

function generarClaveSesion() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function limpiarSesionesExpiradas() {
  const ahora = Date.now();
  for (const [sessionKey, sesion] of sessions.entries()) {
    if (ahora - sesion.createdAt > SESSION_TTL_MS) {
      sessions.delete(sessionKey);
    }
  }
}
setInterval(limpiarSesionesExpiradas, 60000);

// ---- HTTP: validar clave de servidor (solo para modo master) ----
app.post('/validate-master-key', (req, res) => {
  const { key } = req.body || {};
  if (key === SERVER_MASTER_KEY) {
    return res.json({ valid: true });
  }
  return res.status(401).json({ valid: false, error: 'Clave de servidor inválida' });
});

// ---- WebSocket: señalización y emparejamiento ----
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  let clientInfo = null;

  const send = (data) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(data));
    }
  };

  ws.on('message', (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      send({ type: 'error', error: 'Mensaje JSON inválido' });
      return;
    }

    switch (msg.type) {
      case 'identify': {
        clientInfo = {
          deviceId: msg.deviceId || null,
          role: msg.role, // 'master' | 'esclavo'
          nickname: msg.nickname || '',
          carBrand: msg.carBrand || '',
          carModel: msg.carModel || '',
          sessionKey: msg.sessionKey || null
        };
        clients.set(ws, clientInfo);

        if (clientInfo.role === 'master') {
          // Requiere clave de servidor para crear sesión
          if (msg.serverKey !== SERVER_MASTER_KEY) {
            send({ type: 'error', error: 'Clave de servidor inválida para modo master' });
            ws.close(1008, 'Clave de servidor inválida');
            return;
          }

          const sessionKey = generarClaveSesion();
          sessions.set(sessionKey, {
            masterId: clientInfo.deviceId,
            createdAt: Date.now(),
            ttl: SESSION_TTL_MS,
            slaves: new Set()
          });
          clientInfo.sessionKey = sessionKey;

          send({
            type: 'session_created',
            sessionKey,
            expiresIn: SESSION_TTL_MS
          });
          console.log(`[Master] ${clientInfo.deviceId} creó sesión ${sessionKey}`);
        } else if (clientInfo.role === 'esclavo') {
          const session = sessions.get(clientInfo.sessionKey);
          if (!session) {
            send({ type: 'error', error: 'Sesión no encontrada o expirada' });
            ws.close(1008, 'Sesión inválida');
            return;
          }

          session.slaves.add(clientInfo.deviceId);
          send({ type: 'joined', sessionKey: clientInfo.sessionKey, masterId: session.masterId });

          // Notificar al master que se conectó un esclavo
          for (const [c, info] of clients) {
            if (info.role === 'master' && info.deviceId === session.masterId) {
              c.send(JSON.stringify({
                type: 'slave_joined',
                deviceId: clientInfo.deviceId,
                nickname: clientInfo.nickname,
                car: `${clientInfo.carBrand} ${clientInfo.carModel}`
              }));
            }
          }
          console.log(`[Esclavo] ${clientInfo.deviceId} se unió a sesión ${clientInfo.sessionKey}`);
        }
        break;
      }

      case 'relay': {
        // Reenvía un mensaje cifrado entre dispositivos de la misma sesión
        if (!clientInfo || !clientInfo.sessionKey) {
          send({ type: 'error', error: 'No identificado' });
          return;
        }

        const { target, payload } = msg;
        const reenviado = {
          type: 'relay',
          from: clientInfo.deviceId,
          fromRole: clientInfo.role,
          payload,
          timestamp: Date.now()
        };

        for (const [c, info] of clients) {
          if (c === ws || c.readyState !== c.OPEN) continue;
          if (!info.sessionKey || info.sessionKey !== clientInfo.sessionKey) continue;

          if (target === 'master' && info.role === 'master') {
            c.send(JSON.stringify(reenviado));
          } else if (target === 'esclavos' && info.role === 'esclavo') {
            c.send(JSON.stringify(reenviado));
          } else if (target === info.deviceId) {
            c.send(JSON.stringify(reenviado));
          }
        }
        break;
      }

      case 'ping':
        send({ type: 'pong', timestamp: Date.now() });
        break;

      default:
        send({ type: 'error', error: `Tipo de mensaje desconocido: ${msg.type}` });
    }
  });

  ws.on('close', () => {
    if (!clientInfo) return;
    clients.delete(ws);

    if (clientInfo.role === 'master' && clientInfo.sessionKey) {
      const session = sessions.get(clientInfo.sessionKey);
      if (session) {
        sessions.delete(clientInfo.sessionKey);
        // Notificar a esclavos restantes que el master cayó
        for (const [c, info] of clients) {
          if (info.role === 'esclavo' && info.sessionKey === clientInfo.sessionKey && c.readyState === c.OPEN) {
            c.send(JSON.stringify({ type: 'master_disconnected', reason: 'servidor' }));
          }
        }
      }
    } else if (clientInfo.role === 'esclavo' && clientInfo.sessionKey) {
      const session = sessions.get(clientInfo.sessionKey);
      if (session) {
        session.slaves.delete(clientInfo.deviceId);
      }
    }
  });

  ws.on('error', () => {
    // Silencioso; el close se encargará de limpiar
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Servidor de señales] Escuchando en http://0.0.0.0:${PORT}`);
  console.log(`[Servidor de señales] SERVER_MASTER_KEY configurado: ${SERVER_MASTER_KEY ? 'SÍ' : 'NO (usando por defecto)'}`);
});

module.exports = { app, server, sessions, clients };
