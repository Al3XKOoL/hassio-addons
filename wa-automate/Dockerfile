# Usar Alpine Linux como base
FROM alpine:latest

# Definir la variable de entorno NODEJS_PORT / Sobreescrito en main.js
# ENV NODEJS_PORT 3000

# Instalar Node.js, npm y PHP
RUN apk add --update nodejs npm php7 php7-fpm php7-opcache php7-gd php7-mysqli php7-zlib php7-curl

# Crear el directorio de trabajo
WORKDIR /share/wa-automate

# Instalar wa-automate y wa-decrypt
RUN npm install -g @open-wa/wa-automate
RUN npm install -g @open-wa/wa-decrypt

# Instalar un servidor web (por ejemplo, nginx)
RUN apk add nginx

# Configurar el servidor web para servir archivos desde /share/wa-automate
RUN echo "server { listen \$WEB_PORT; server_name localhost; location / { root /share/wa-automate; index index.html index.htm; } location ~ \.php$ { include fastcgi_params; fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name; fastcgi_pass 127.0.0.1:9000; } }" > /etc/nginx/conf.d/default.conf

# Exponer el puerto del servidor web
EXPOSE $WEB_PORT

# Iniciar el servidor web
CMD ["nginx", "-g", "daemon off;"]

# Define el comando de inicio para ejecutar wa-automate
CMD ["/run.sh"]