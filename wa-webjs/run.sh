#!/usr/bin/with-contenv bashio

#echo "Iniciando run.sh!"

# Escribe el contenido de la opción main_js en main.js
#echo "$MAIN_JS" > /share/wa-webjs/main.js

apk add --update python3.8 python3-pip
pip install flask flask-tls

#Move init here...
cd /share/wa-webjs
npm init -y
npm install qrcode-terminal
npm install whatsapp-web.js


echo "iniciando main.js"
# Iniciar wa-webjs y flask
cd /share/wa-webjs && node main.js & python38 web.py
