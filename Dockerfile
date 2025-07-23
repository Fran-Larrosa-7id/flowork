# Etapa 1: Build de Angular
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: Servidor NGINX
FROM nginx:stable-alpine

# Copia el build al nginx
COPY --from=builder /app/dist/Flowork/browser /usr/share/nginx/html

# Reemplaza la config por una custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
