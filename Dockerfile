# Usar la imagen oficial de Node.js
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para el build)
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Eliminar devDependencies para reducir el tamaño de la imagen
RUN npm prune --production

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"] 