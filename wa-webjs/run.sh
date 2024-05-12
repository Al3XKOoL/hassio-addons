#!/usr/bin/with-contenv bashio

#echo "Iniciando run.sh!"

# Escribe el contenido de la opción main_js en main.js
#echo "$MAIN_JS" > /share/wa-webjs/main.js

apk add --no-cache python3 py3-pip
pip3 install flask flask_tlsauth --break-system-packages

#Move init here...
cd /share/wa-webjs
npm init -y
npm install qrcode-terminal
npm install whatsapp-web.js


echo "iniciando main.js"
# Iniciar wa-webjs y flask
cd /share/wa-webjs && node main.js & python3 web.py
