ARG BUILD_FROM=alpine:3.19
FROM ${BUILD_FROM}

# Instalar Node.js y npm
RUN apk add --no-cache nodejs npm

# Crear directorio de la aplicación
WORKDIR /app

# Copiar package.json primero (para cache de npm install)
COPY package.json .

# Instalar dependencias de producción (solo production, sin devDependencies)
RUN npm ci --only=production

# Copiar código del servidor
COPY server.js .

# Crear usuario no root para seguridad
RUN addgroup -S rutas && adduser -S rutas -G rutas
USER rutas

# Configurar límites de memoria para Node.js (evita OOM 137)
ENV NODE_OPTIONS="--max-old-space-size=128"

# Exponer puerto WebSocket interno
EXPOSE 3000
