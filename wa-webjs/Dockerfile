#ARG BUILD_FROM=alpine:latest
ARG BUILD_FROM=node:bookworm
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

RUN apt update && apt upgrade -y

# Instala python 3.8
RUN apt install -y python3 python3-pip

RUN apt install -y python3-flask python3-flask-login #python3-flask-tls

# Instalar Node.js, npm y PHP
RUN apt install -y nodejs npm

# Instala chromium
RUN apt install -y chromium

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
