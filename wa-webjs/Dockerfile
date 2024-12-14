#ARG BUILD_FROM=alpine:latest
ARG BUILD_FROM=node:bookworm
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

RUN apt update && apt upgrade -y

# Instala python 3.8
RUN apt install -y python3 python3-pip snapd

RUN apt install -y python3-flask #python3-flask-tls

# Instalar Node.js, npm y PHP
RUN apt install -y nodejs npm

# Instala chromium
#RUN apt install gnupg wget -y && \
#    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
#    sh -c 'echo "deb [arch=arm64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
#    apt-get update && \
#    apt-get install google-chrome-stable -y --no-install-recommends && \
#    rm -rf /var/lib/apt/lists/*

#RUN apt purge -y snapd
#RUN snap install chromium
RUN apt install -y chromium
#RUN apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# Establecer variables de entorno para Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Crear el directorio de trabajo
WORKDIR /share/wa-webjs

# Inicializa proyecto
RUN npm init -y

# Copiar el archivo package.json al directorio de trabajo
COPY package.json /share/wa-webjs/

# Instalar las dependencias del proyecto
RUN npm install

# Instalar las dependencias del proyecto
RUN npm install -g
RUN npm install n -g
RUN n stable

# Libreria para qr
RUN npm install qrcode-terminal

# Instalar wa-webjs
RUN npm i whatsapp-web.js
RUN npm install moment
#RUN npm install puppeteer-core
#RUN npm install puppeteer
RUN npm install puppeteer@latest

# Exponer el puerto que tu aplicación utilizará
EXPOSE 8998

# Copia el archivo run.sh desde tu directorio local al directorio de trabajo en el contenedor
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
