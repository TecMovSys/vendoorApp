# App Web para Potenciar Negocios de Pequeños Comerciantes y Productores  
**Autor:** CShinoDev
**Módulo:** Módulo IV - DevOps  

---

## 📄 Descripción general

Esta plataforma conecta a pequeños comerciantes y productores locales con sus comunidades y nuevos clientes. Es una aplicación web simple, efectiva y accesible que busca fomentar la economía local en zonas de Ecuador donde predominan los microemprendimientos.

Permite a los usuarios registrarse, publicar productos, gestionar su perfil de negocio, y contactar a vendedores a través de WhatsApp, facilitando la comunicación directa y efectiva.

---

## 🧱 Tecnologías utilizadas

- **Frontend:** React, React Router DOM, Axios, CSS modular  
- **Backend:** Django REST Framework con autenticación JWT (access y refresh tokens)  
- **Base de Datos:** SQLite (modo local), planificado PostgreSQL para producción  
- **Autenticación:** JWT con almacenamiento en `localStorage`  
- **Diseño Responsivo:** En desarrollo, con media queries y Flexbox  
- **Herramientas de despliegue:** Render (Frontend y Backend)  
- **Integraciones futuras:** Google Maps API o Leaflet para geolocalización  

---

## 💻 Instrucciones para ejecutar localmente

### Clonar el repositorio

```bash
- git clone <URL-del-repositorio>
cd <nombre-del-repo>

## 💻 BACKEND
- cd backend
- python -m venv env
- source env/bin/activate      # Windows: env\Scripts\activate
- pip install -r requirements.txt

#Crear archivo .env en la raíz del backend 

- SECRET_KEY=<tu-clave-secreta>
- DEBUG=True
- ALLOWED_HOSTS=localhost,127.0.0.1
- DATABASE_URL=<tu-url-de-postgres>  # Opcional, si usas PostgreSQL

#Migrar base de datos e iniciar servidor
- python manage.py migrate
- python manage.py runserver

# Frontend (React)
- cd ../frontend
- npm install
- npm start

###🚀 Proceso de Despliegue

- Dividí la aplicación en dos partes: frontend y backend.

- Frontend: Se ejecuta npm run build para crear un build estático, desplegado en Render como Static Site (también planeado para Vercel o Netlify).

- Backend: Desplegado como Web Service en Render o Railway, ejecutando el servidor Django con Gunicorn y conectado a una base de datos PostgreSQL en la nube.

- Las variables de entorno (SECRET_KEY, DEBUG, DATABASE_URL, etc.) se gestionan desde el panel de configuración de Render.

- 🟢 Enlace de producción: https://vendoorapp.onrender.com
- (reemplazar con URL real cuando esté desplegada)

- 🧩 Estructura de componentes (Frontend - React)

- Navbar: Navegación principal con login/logout y enlaces según estado autenticación

- Login / Register: Formularios de autenticación y registro de usuarios

- Dashboard: Página principal con listado de productos

- ProductForm: Formulario para crear o editar productos

- ProductList: Listado de productos con filtros para mostrar solo los del usuario o excluirlos

- Perfil: Gestión y edición del perfil del comerciante/productor

- App: Configuración general de rutas con React Router y control de visibilidad de navbar

- 🔑 Funcionalidades clave

- Registro y perfil de comerciantes/productores

- Registro con validación de contraseña y email

- Perfil editable con datos de negocio: nombre, descripción, ubicación, horarios, contacto

- Catálogo de productos o servicios

- Crear, editar y eliminar productos con atributos: nombre, descripción, precio, cantidad, estado (disponible/vendido)

- Visualización de productos propios y de otros usuarios

- Integración directa con WhatsApp para contacto con el vendedor

- Gestión de disponibilidad

- En la página de venta, el usuario puede marcar productos como vendidos o disponibles, con cambios reflejados en tiempo real

- Comunicación integrada

- Botón funcional que abre chat en WhatsApp con mensaje predefinido

- Control de autenticación y seguridad

- JWT para proteger rutas sensibles

- Tokens almacenados en localStorage para persistencia de sesión

## 🛠️ Funcionalidades futuras
- Funcionalidad	Estado
- Gestión avanzada de perfil	🔜 En desarrollo
- Carga de imágenes para productos	🔜 Pendiente
- Notificaciones internas (pedidos)	🔜 Planificado
- Valoraciones/reseñas de clientes	🔜 Planificado
- Mapa interactivo y geolocalización	🔜 Planificado
- Dashboard para administradores	🔜 Futuro
- App móvil (React Native o Flutter)	🔜 Futuro
- 🧠 Desafíos y soluciones
 
- Integrar formularios dinámicos en React sin romper el estado global:
- Solución: Uso combinado de useState y useContext, además de un diseño modularizado por componentes.

- Diseño responsive en pantallas pequeñas:
- Solución: Implementación progresiva con media queries y Flexbox.

- Manejo de autenticación JWT en llamadas API:
- Solución: Inclusión del token en encabezados Authorization: Bearer <token> para endpoints protegidos.

- Creación/actualización de perfil inexistente:
- Solución: Lógica para crear perfil automáticamente si no existe antes de actualizar.

- Errores en despliegue por falta de variables de entorno:
- Solución: Añadir correctamente SECRET_KEY y otras variables en panel de Render.

- 🌍 Impacto esperado

- Incrementar visibilidad digital para microempresarios sin presencia online

- Promover comercio local justo y directo

- Reducir intermediarios para mejorar ingresos de pequeños productores

- Facilitar inclusión digital en comunidades rurales y semiurbanas de Ecuador

- 🎨 Diseño visual

- Estilo limpio y funcional inspirado en Amazon

- Navbar centrada con ancho máximo de 1200px para buena legibilidad

- Paleta de colores: Azul (#007bff), blanco y grises suaves

- Diseño responsive en progreso para móviles y tablets