# Changelog

## [1.0.0] - 2026-11-12

### Añadido
- Servidor de señalización WebSocket para app Rutas GPS
- Generación y validación de claves de sesión temporales (6 dígitos)
- Validación de clave de servidor para modo master
- Relé de mensajes entre master y esclavos
- Gestión de sesiones en memoria con TTL configurable
- Soporte para arquitecturas: aarch64, amd64, armhf, armv7, i386
- Puerto WebSocket 3000/tcp expuesto
- Compatible con Cloudflared para acceso externo sin abrir puertos
