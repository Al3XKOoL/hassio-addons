ARG BUILD_FROM=ghcr.io/home-assistant/aarch64-base-image:3.5
FROM ${BUILD_FROM}

# Instalar Node.js y npm
RUN apk add --no-cache nodejs npm

# Crear directorio de la aplicación
WORKDIR /app

# Copiar archivos del servidor
COPY package.json .
COPY server.js .
COPY .env.example .

# Instalar dependencias de producción
RUN npm install --production

# Crear usuario no root para seguridad
RUN addgroup -S rutas && adduser -S rutas -G rutas
USER rutas

# Exponer puerto WebSocket interno (Cloudflared hará proxy a este)
EXPOSE 3000

# Comando de inicio
CMD ["node", "server.js"]
