# Agenda de Contactos
## Descripción
Aplicación de agenda de contactos para gestionar información de contacto de personas y empresas.

## Stack Tecnológico
* Frontend: React.js
* Backend: Node.js con Express.js
* Base de Datos: MongoDB
* Autenticación: JSON Web Tokens (JWT)
* Testing: Jest y Enzyme

## Instalación
1. Clonar el repositorio: `git clone https://github.com/tu-usuario/agenda-de-contactos.git`
2. Instalar dependencias: `npm install`
3. Iniciar servidor: `npm start`

## Docker
1. Construir imagen: `docker build -t agenda-de-contactos .`
2. Iniciar contenedor: `docker run -p 3000:3000 agenda-de-contactos`

## Endpoints
### Autenticación
* **POST /login**: Autenticar usuario
 + Parámetros: `email`, `password`
 + Respuesta: `token` de autenticación
* **POST /register**: Registrar nuevo usuario
 + Parámetros: `name`, `email`, `password`
 + Respuesta: `token` de autenticación

### Contactos
* **GET /contacts**: Obtener lista de contactos
 + Parámetros: `page`, `limit`
 + Respuesta: Lista de contactos
* **GET /contacts/:id**: Obtener contacto por ID
 + Parámetros: `id`
 + Respuesta: Contacto
* **POST /contacts**: Crear nuevo contacto
 + Parámetros: `name`, `email`, `phone`
 + Respuesta: Contacto creado
* **PUT /contacts/:id**: Actualizar contacto
 + Parámetros: `id`, `name`, `email`, `phone`
 + Respuesta: Contacto actualizado
* **DELETE /contacts/:id**: Eliminar contacto
 + Parámetros: `id`
 + Respuesta: Mensaje de confirmación

## Seguridad
* Autenticación con JSON Web Tokens (JWT)
* Validación de parámetros y payloads
* Protección contra ataques de inyección SQL y cross-site scripting (XSS)
* Uso de HTTPS para cifrar comunicaciones entre cliente y servidor

## Contribuir
1. Clonar el repositorio
2. Crear una rama para tu contribución
3. Realizar cambios y commit
4. Enviar pull request

## Licencia
MIT License

## Créditos
* [Tu nombre](https://github.com/tu-usuario) - Desarrollador principal
* [Lista de contribuyentes](https://github.com/tu-usuario/agenda-de-contactos/contributors) - Contribuyentes adicionales