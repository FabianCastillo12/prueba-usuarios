# Prueba Técnica - Usuarios y Productos

Este repositorio contiene la solución a una prueba técnica para Backend Developer Junior, implementada en Node.js con Express, TypeScript y arquitectura hexagonal. La solución responde a los siguientes requerimientos:

1. **Crear usuario**
   - Endpoint: `POST /users`
   - Permite crear un usuario con las propiedades: nombre, correo y edad.
   - Valida que todos los campos obligatorios estén presentes y maneja errores apropiadamente.

2. **Obtener productos**
   - Endpoint: `GET /products`
   - Devuelve la lista de productos almacenados, replicando el comportamiento de un fragmento .NET proporcionado en la prueba.

## Arquitectura

El proyecto sigue la **arquitectura hexagonal (Ports & Adapters)**, separando la lógica de negocio (dominio y aplicación) de la infraestructura (Express, base de datos, etc).

- **domain/**: Entidades, servicios y puertos (interfaces de repositorios).
- **application/**: Casos de uso y DTOs.
- **infrastructure/**: Controladores, rutas, repositorios y servicios de base de datos.

## Tecnologías
- Node.js
- Express
- TypeScript
- PostgreSQL

## Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/FabianCastillo12/prueba-usuarios
   cd prueba-usuarios
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura tu archivo `.env` con los datos de conexión a PostgreSQL.
4. Inicia el servidor:
   ```bash
   npm start
   ```
5. La API estará disponible en `http://localhost:3000`

## Endpoints principales

- **Crear usuario:**  
  `POST /users`  
  Body (JSON):
  ```json
  {
    "nombre": "Juan",
    "correo": "juan@ejemplo.com",
    "edad": 30
  }
  ```

- **Obtener productos:**  
  `GET /products`

## Notas
- El proyecto utiliza PostgreSQL como base de datos principal.
- El código es fácilmente extensible y sigue buenas prácticas de separación de responsabilidades.
- Arquitectura hexagonal para facilitar pruebas y mantenibilidad.

---

