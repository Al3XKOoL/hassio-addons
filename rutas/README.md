# Addon Servidor Señales Rutas GPS

Servidor de señalización WebSocket para la app **Rutas GPS** (Android Kotlin + iOS Swift). Permite que un dispositivo actúe como **master** (guía de ruta) y los demás como **esclavos** que reciben instrucciones de navegación en tiempo real.

## Instalación desde tu repositorio

1. Ve a **Configuración > Complementos > Tienda de complementos**
2. Toca los tres puntos (⋮) > **Repositorios**
3. Añade: `https://github.com/Al3XKOoL/hassio-addons`
4. Busca "Servidor Señales Rutas GPS" e instálalo

## Configuración

| Opción | Descripción | Ejemplo |
|--------|-------------|---------|
| `server_master_key` | Clave requerida para conectar como MASTER | `MiClaveSecreta123` |
| `session_ttl_ms` | Tiempo de expiración de claves de sesión (ms) | `3600000` (1 hora) |
| `log_level` | Nivel de logs | `info` |

Ejemplo:
```yaml
server_master_key: "rutas123"
session_ttl_ms: 3600000
log_level: "info"
```

## Uso con Cloudflared

Este addon expone el puerto 3000 internamente. Si tienes el addon **Cloudflared** instalado, puedes crear un túnel que apunte a `http://localhost:3000` o `http://rutas-senales.local:3000` para acceder desde fuera sin abrir puertos en el router.

## Arquitectura

- **Node.js + Express + WebSocket (`ws`)**
- Ejecuta en contenedor Docker dentro de Home Assistant
- Puerto interno: 3000/tcp
- Sesiones en memoria (Redis opcional para escalar)
- Cifrado de capa de aplicación (AES-256-GCM) gestionado en las apps cliente

## Protocolo WebSocket

### Identificación (master/esclavo)
```json
{"type":"identify","role":"master","deviceId":"...","nickname":"Juan","carBrand":"Toyota","carModel":"Corolla","serverKey":"..."}
```

### Crear sesión (master)
```json
{"type":"session_created","sessionKey":"123456","expiresIn":3600000}
```

### Unirse (esclavo)
```json
{"type":"joined","sessionKey":"123456","masterId":"..."}
```

### Relé de posición (cifrado)
```json
{"type":"relay","target":"esclavos","sessionKey":"123456","payload":{"cifrado":"BASE64(AES-256-GCM)"}}
```

## Soporte

Reporta problemas en: https://github.com/Al3XKOoL/hassio-addons/issues
