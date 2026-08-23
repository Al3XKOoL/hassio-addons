ARG BUILD_FROM=node:bookworm
FROM ${BUILD_FROM}

# Actualización e instalación de dependencias, Python y Node.js
RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs \
    npm \
    python3 \
    python3-pip \
    python3-flask \
    python3-flask-login \
    chromium \
    libgbm1 \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc-s1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    libatk-bridge2.0-0 \
    ca-certificates \
    fonts-liberation \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Variables de entorno para Puppeteer y Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Directorio de trabajo
WORKDIR /share/wa-webjs

# Copiar el manifiesto del proyecto
COPY package.json /share/wa-webjs/

# Instalación de módulos Node.js
RUN npm install && \
    npm install qrcode-terminal whatsapp-web.js moment puppeteer@latest

EXPOSE 8998

# Script de inicio
COPY run.sh /
RUN chmod +x /run.sh

CMD [ "/run.sh" ]
