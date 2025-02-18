# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del API al contenedor
COPY api/package.json api/package-lock.json /app/api/
COPY api/src /app/api/src/

# Cambia al directorio del API
WORKDIR /app/api

# Instala las dependencias del API
RUN npm install

# Exponemos el puerto que el API va a usar (puedes cambiar el puerto si es necesario)
EXPOSE 3001

# Comando para ejecutar la API (ajusta si tienes un script específico en package.json)
CMD ["npm", "start"]
