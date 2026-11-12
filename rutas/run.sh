#!/bin/bash

# Leer configuración del addon
SERVER_MASTER_KEY=$(bashio::config 'server_master_key')
SESSION_TTL_MS=$(bashio::config 'session_ttl_ms')
LOG_LEVEL=$(bashio::config 'log_level')

# Escribir variables de entorno
export SERVER_MASTER_KEY="${SERVER_MASTER_KEY}"
export SESSION_TTL_MS="${SESSION_TTL_MS}"
export LOG_LEVEL="${LOG_LEVEL}"

bashio::log.info "Iniciando Servidor Señales Rutas GPS..."
bashio::log.info "Clave de servidor configurada: ${SERVER_MASTER_KEY}"
bashio::log.info "Puerto: 3000"

# Ejecutar servidor
exec node /app/server.js
