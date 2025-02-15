# Etapa de construcción del bot
FROM node:18-bullseye as bot

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Instalar pm2 de forma global
RUN npm install -g pm2

# Exponer el puerto que usa la aplicación
EXPOSE 3000

# Configurar las variables de entorno necesarias
ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT

# Ejecutar el bot con pm2 y reiniciarlo automáticamente cada 12 horas
CMD ["pm2-runtime", "start", "npm", "--", "start", "--cron", "0 */12 * * *"]

