#!/usr/bin/with-contenv bashio

# Escribe el contenido de la opción main_js en main.js
#echo "$MAIN_JS" > /share/wa-webjs/main.js

cd /share/wa-webjs

echo "iniciando main.js"
# Iniciar wa-webjs y flask
cd /share/wa-webjs && node main.js & python3 web.py
