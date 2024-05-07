# Usa la imagen base de Alpine Linux
ARG BUILD_FROM
FROM alpine:latest

# Instala las dependencias necesarias
RUN apk update && apk add --no-cache \
    nodejs \
    npm \
    git \
    curl

# Clona el repositorio de wa-automate
# RUN git clone https://github.com/open-wa/wa-automate-docker.git /wa-automate
#RUN npm i -g --save @open-wa/wa-automate@latest

# Cambia al directorio del repositorio
WORKDIR '/app'

# Instala las dependencias de wa-automate
#RUN npm install

# Copia el archivo de inicio personalizado (run.sh)
COPY run.sh /

# Otorga permisos de ejecución al archivo run.sh
RUN chmod a+x /run.sh

RUN npm install npm@latest
RUN npm i -g --save @open-wa/wa-automate@latest
# Define el comando de inicio para ejecutar wa-automate
CMD ["/run.sh"]
