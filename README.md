# 🚀 Flowork

> Plataforma para la gestión eficiente del flujo de facturación entre cliente y comercial.

![Angular](https://img.shields.io/badge/Angular-20-dd0031?logo=angular&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2317b7b9?logo=tailwindcss&logoColor=white)
![Dockerized](https://img.shields.io/badge/Docker-ready-blue?logo=docker&logoColor=white)
![Status](https://img.shields.io/badge/MVP-Mockeado-lightgrey)

---

## 🧠 ¿Qué es Flowork?

**Flowork** es un portal de clientes que permite digitalizar y automatizar el proceso de:

- Carga y aprobación de informes de facturación
- Descarga de facturas
- Carga de orden de pago y documentos relacionado
- Visualización de resumen de cuenta
- Alertas e indicadores de mora o incumplimiento

---

## ⚙️ Stack técnico

- 💻 **Angular 20**
- 🎨 **Tailwind CSS + Glassmorphism**
- 🖼️ **AOS para animaciones**
- 🐳 **Docker + NGINX**
- 🔒 Preparado para integrar autenticación y backend en el futuro

---

## 📦 Instalación local

1. Cloná el repo

```bash
git clone https://github.com/tu-usuario/flowwork.git
cd flowwork

npm install

ng serve
```
## 🐳 Instalacion en Docker

```
npm run build --prod

docker build -t flowork-frontend .

docker run -d -p 8080:80 flowork-frontend
```
## 👥 Equipo Flowwork

| 🧑‍💼 Nombre              | 🛠️ Rol                                 |
|-------------------------|----------------------------------------|
| Santiago Diaz Pace      | 🎯 PM & Brand Identity                  |
| Francisco Larrosa       | 💻 Frontend Developer *(Angular King)* |
| María Emilia Tunesi     | 🧪 QA & Análisis funcional              |

---


## 🐳 Dockerización con NGINX

Para servir el frontend de Angular de manera eficiente, utilizamos un contenedor Docker basado en **NGINX**, que es el enfoque estándar y recomendado para apps SPA en producción.

### ✅ ¿Por qué usamos NGINX?

- ⚡ **Rendimiento**: NGINX es extremadamente rápido y liviano para servir archivos estáticos.
- 🔁 **Soporte para rutas de Angular**: gracias a la configuración de `try_files`, todas las rutas se redirigen a `index.html`, como espera Angular.
- 📦 **Portabilidad**: el contenedor se puede levantar en cualquier servidor en segundos.
- 🛡️ **Seguridad**: NGINX puede configurarse para manejar HTTPS, headers seguros y más.

---

### ⚙️ ¿Cómo lo hicimos?

1. **Creamos un `Dockerfile` multistage y `.dockerignore`**:
   - En la primera etapa, se construye el proyecto Angular (`npm run build`).
   - En la segunda etapa, se copia el resultado (`dist/`) a una imagen base de NGINX.

```Dockerfile
# Etapa 1: Build de Angular
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: NGINX para servir el build
FROM nginx:stable-alpine
COPY --from=builder /app/dist/flowwork /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Creamos una configuración custom de  `NGINX` (nginx.conf)**:
```
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg)$ {
    expires 1y;
    access_log off;
    add_header Cache-Control "public";
  }
}
```
3. **Contenido de `.dockerignore`**
```
node_modules
dist
.git
.gitignore
Dockerfile
README.md
```
4. **Comandos para levantar la app dockerizada**:
```
npm run build --prod
docker build -t flowwork-frontend .
docker run -d -p 8080:80 flowwork-frontend
```

---

## 🧪 Testing & Calidad de Código

**Flowork** cuenta con una suite completa de pruebas unitarias con alta cobertura para garantizar la calidad y confiabilidad del código.

### 📊 Cobertura Actual
- **Statements**: 92.1% (35/38)
- **Branches**: 100% (18/18) ✨
- **Functions**: 88.88% (8/9)
- **Lines**: 91.89% (34/37)

### 🎯 Total de Pruebas: **37 pruebas exitosas**

### 🚀 Comandos de Testing

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con cobertura
npm run test:coverage

# Ejecutar pruebas en modo CI (headless)
npm run test:ci
```

### 🧪 ¿Qué está probado?

#### **Componente App**
- ✅ Configuración de tema oscuro/claro
- ✅ Manejo de localStorage y preferencias del sistema
- ✅ Integración con AOS (animaciones)
- ✅ Manipulación de clases CSS

#### **Componente Login**
- ✅ Validación completa de formularios reactivos
- ✅ Validación de email y contraseña
- ✅ Manejo de estados de carga (signals)
- ✅ Mensajes de error personalizados
- ✅ Flujos de envío de formulario

### 📈 Reportes de Cobertura

Los reportes se generan automáticamente en la carpeta `coverage/`:

```bash
# Ver reporte HTML interactivo
explorer.exe .\coverage\index.html
```

### 🛠️ Herramientas Utilizadas

- **Framework**: Jasmine + Karma
- **Navegador de pruebas**: Chrome/ChromeHeadless
- **Cobertura**: Istanbul
- **Mocking**: Jasmine Spies para APIs del navegador
- **CI/CD Ready**: Configurado para integración continua

### ⚙️ Configuración Especial para Apps Zoneless

Como Flowork usa **zoneless change detection**, se requirió configuración adicional:

```bash
# 1. Instalar Zone.js para testing
npm install zone.js --save-dev

# 2. Crear polyfills.ts con Zone.js
# 3. Configurar angular.json para incluir polyfills
# 4. Configurar karma.conf.js personalizado
```

> 💡 **Importante**: Las apps zoneless requieren Zone.js específicamente para testing, aunque no lo usen en runtime.

### 🏆 Beneficios

- 🔍 **Detección temprana de bugs**
- 🔄 **Refactoring seguro**
- 📝 **Documentación viva del comportamiento**
- 🚀 **Integración continua lista**

> 💡 **Tip**: Para ver detalles completos sobre testing, consulta el archivo `TESTING.md`
