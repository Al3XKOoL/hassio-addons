#!/usr/bin/with-contenv bashio

#echo "Iniciando run.sh!"

# Escribe el contenido de la opción main_js en main.js
#echo "$MAIN_JS" > /share/wa-automate/main.js

echo "iniciando main.js"
# Iniciar wa-automate
cd /share/wa-automate && node main.js
