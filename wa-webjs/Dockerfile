ARG BUILD_FROM=alpine:latest
# hadolint ignore=DL3006
FROM ${BUILD_FROM}


RUN apk update && apk upgrade

# Instalar Node.js, npm y PHP
RUN apk add --update nodejs npm

# Instala chromium
RUN apk add --no-cache chromium

# Establecer variables de entorno para Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Crear el directorio de trabajo
WORKDIR /share/wa-webjs

# Copiar el archivo package.json al directorio de trabajo
COPY package.json .

# Instalar las dependencias del proyecto
# RUN npm install

# Instalar las dependencias del proyecto
RUN npm install -g

# Exponer el puerto que tu aplicación utilizará
EXPOSE 8999

# Copia el archivo run.sh desde tu directorio local al directorio de trabajo en el contenedor
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
