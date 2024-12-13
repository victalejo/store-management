
# Sistema de Gestión de Tienda

Sistema web para la gestión de productos y clientes de tiendas minoristas, desarrollado con React, TypeScript, Node.js, Express y MongoDB.

## Características

- 🏠 **Página de Inicio** personalizable según la temática de la tienda
- 📦 **Gestión de Productos**
    - Creación y edición de productos
    - Listado con detalles como nombre, categoría, precio y descripción
    - Control de inventario
- 👥 **Gestión de Clientes**
    - Registro y actualización de información de clientes
    - Listado de clientes con datos de contacto
- 📊 **Estadísticas Básicas**
    - Total de productos registrados
    - Número de clientes
- 📱 **Diseño Responsive** adaptado a dispositivos móviles y escritorio

## Tecnologías Utilizadas

### Frontend
- React.js con TypeScript
- React Router para navegación
- Tailwind CSS para estilos
- Axios para llamadas API

### Backend
- Node.js con Express
- TypeScript
- MongoDB con Mongoose
- JWT para autenticación

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB instalado y ejecutándose
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/victalejo/store-management.git
cd store-management
```

2. Instalar dependencias del frontend:
```bash
cd client
npm install
```

3. Instalar dependencias del backend:
```bash
cd ../server
npm install
```

4. Configurar variables de entorno:

Crear archivo `.env` en la carpeta `server`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/store-management
JWT_SECRET=tu_secreto_jwt
```

Crear archivo `.env` en la carpeta `client`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Estructura del Proyecto

```
store-management/
├── client/                # Frontend React con TypeScript
│   ├── public/           # Archivos estáticos
│   └── src/             
│       ├── components/   # Componentes React
│       ├── pages/        # Páginas principales
│       ├── services/     # Servicios para API
│       └── types/        # Tipos TypeScript
│
└── server/               # Backend Node.js
    └── src/
        ├── controllers/  # Controladores
        ├── models/       # Modelos MongoDB
        ├── routes/       # Rutas API
        └── middleware/   # Middleware
```

## Ejecución

1. Iniciar el servidor de desarrollo (backend):
```bash
cd server
npm run dev
```

2. En otra terminal, iniciar el cliente (frontend):
```bash
cd client
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## API Endpoints

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto por ID
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Clientes
- `GET /api/customers` - Obtener todos los clientes
- `GET /api/customers/:id` - Obtener un cliente por ID
- `POST /api/customers` - Crear nuevo cliente
- `PUT /api/customers/:id` - Actualizar cliente
- `DELETE /api/customers/:id` - Eliminar cliente

## Características de Seguridad

- Autenticación mediante JWT
- Validación de datos en frontend y backend
- Manejo seguro de contraseñas
- Protección de rutas sensibles

## Scripts Disponibles

### Frontend
- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta los tests
- `npm run lint` - Ejecuta el linter

### Backend
- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm start` - Inicia el servidor en modo producción
- `npm test` - Ejecuta los tests
- `npm run build` - Compila TypeScript a JavaScript
