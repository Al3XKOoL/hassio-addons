ARG BUILD_FROM=alpine:latest
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Definir la variable de entorno NODEJS_PORT / Sobreescrito en main.js
# ENV NODEJS_PORT 3000

RUN apk update && apk upgrade

RUN apk add --no-cache chromium

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Instalar Node.js, npm y PHP
RUN apk add --update nodejs npm
#RUN npm install

# Instalar las extensiones PHP necesarias
#RUN docker-php-ext-install mysqli opcache gd
#RUN docker-php-ext-enable mysqli opcache gd

# Crear el directorio de trabajo
WORKDIR /share/wa-automate

# No necesario...
RUN cd /share/wa-automate

# Dependencias o otros
RUN npm install uuid@latest
RUN npm install ignore-check

# Instalar wa-automate y wa-decrypt
RUN npm i --save @open-wa/wa-automate@latest
RUN npm install @open-wa/wa-decrypt

RUN npm install

# Instalar un servidor web (por ejemplo, nginx)
#RUN mkdir -p /etc/nginx
#RUN mkdir -p /etc/nginx/conf.d
#RUN apk add nginx

# Configurar el servidor web para servir archivos desde /share/wa-automate
#RUN echo "server { listen \$WEB_PORT; server_name localhost; location / { root /share/wa-automate; index index.html index.htm; } location ~ \.php$ { include fastcgi_params; fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name; fastcgi_pass 127.0.0.1:9000; } }" > /etc/nginx/conf.d/default.conf

# Exponer el puerto del servidor web
EXPOSE $WEB_PORT

# Iniciar el servidor web
#CMD ["nginx", "-g", "daemon off;"]

# Copia el archivo run.sh desde tu directorio local al directorio de trabajo en el contenedor
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
