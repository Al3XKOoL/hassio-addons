#ARG BUILD_FROM=alpine:latest
ARG BUILD_FROM=node:22-alpine
# hadolint ignore=DL3006
FROM ${BUILD_FROM}


RUN apk update && apk upgrade

# Instala python 3.8
#RUN apk add --update python3.8 python3-pip

#RUN pip install flask flask-tls

# Instalar Node.js, npm y PHP
#RUN apk add --update nodejs npm

# Instala chromium
RUN apk add --no-cache chromium

# Establecer variables de entorno para Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Crear el directorio de trabajo
WORKDIR /share/wa-webjs

# Inicializa proyecto
#RUN npm init -y

# Copiar el archivo package.json al directorio de trabajo
COPY package.json /share/wa-webjs/

# Instalar las dependencias del proyecto
#RUN npm install

# Instalar las dependencias del proyecto
#RUN npm install -g

# Libreria para qr
#RUN npm install qrcode-terminal

# Instalar wa-webjs
#RUN npm i --save  whatsapp-web.js

# Exponer el puerto que tu aplicación utilizará
EXPOSE 8998

# Copia el archivo run.sh desde tu directorio local al directorio de trabajo en el contenedor
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
