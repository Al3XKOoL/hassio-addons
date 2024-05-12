ARG BUILD_FROM=alpine:latest
# hadolint ignore=DL3006
FROM ${BUILD_FROM}


RUN apk update && apk upgrade

# Instalar Node.js, npm y PHP
RUN apk add --update nodejs npm

# Crear el directorio de trabajo
WORKDIR /share/wa-webjs

# No necesario...?
RUN cd /share/wa-webjs

# Inicializar
RUN npm init -y

# Libreria para qr
RUN npm install qrcode-terminal

# Instalar wa-webjs
RUN npm install whatsapp-web.js

RUN npm install

# Copia el archivo run.sh desde tu directorio local al directorio de trabajo en el contenedor
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
