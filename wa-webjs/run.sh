#!/usr/bin/with-contenv bashio

#echo "Iniciando run.sh!"

# Escribe el contenido de la opción main_js en main.js
#echo "$MAIN_JS" > /share/wa-webjs/main.js

#Move init here...
cd /share/wa-webjs
npm init -y
npm install qrcode-terminal
npm install whatsapp-web.js


echo "iniciando main.js"
# Iniciar wa-webjs
cd /share/wa-webjs && node main.js
