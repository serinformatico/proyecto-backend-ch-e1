# Proyecto de Programación Backend I


### Contenido
- [Proyecto de Programación Backend I](#proyecto-de-programación-backend-i)
    - [Contenido](#contenido)
    - [Descripción](#descripción)
    - [Requerimientos:](#requerimientos)
    - [Instalación](#instalación)
    - [URL del proyecto en Vercel](#url-del-proyecto-en-vercel)
    - [Estructura de directorios](#estructura-de-directorios)
    - [¿Te ha gustado este proyecto?](#te-ha-gustado-este-proyecto)


### Descripción
El presente proyecto corresponde al curso de **Programación Backend I** (Desarrollo Avanzado de Backend), dictado por el profesor **Lic. Sergio Regalado Alessi** en la institución **CODERHOUSE**.

Su objetivo es aplicar y consolidar los conocimientos adquiridos en desarrollo backend mediante el uso de herramientas y tecnologías de vanguardia. El resultado es una aplicación robusta, eficiente, mantenible y de alto rendimiento, que demuestra el dominio de los conceptos aprendidos durante el curso.

### Requerimientos:
Para ejecutar el proyecto correctamente, asegúrate de cumplir con los siguientes requisitos de software:
- Node.js v18.20.4
- Mongo Shell v2.2.15
- GIT v2.34.1
- IDE - Visual Studio Code v1.92.0


### Instalación
Para instalar y ejecutar el proyecto, sigue estos pasos:
1. Abre una terminal en la raíz de tu partición principal o en tu directorio preferido.
2. Clona el repositorio del proyecto:
    ``` sh
    git clone https://github.com/serinformatico/proyecto-backend-ch-e1
    ```
1. Navega al directorio del proyecto:
    ``` sh
    cd proyecto-backend-ch-e1
    ```
1. Instala las dependencias del proyecto:
    ``` sh
    npm install
    ```
1. Inicia el servidor en modo desarrollo:
    ``` sh
    npm run dev
    ```
1. En caso de ser necesario, restaurar la base de datos:
    ``` sh
    mongorestore --uri="mongodb+srv://tuUsername:tuPassword@tuCluster/" --nsInclude="proyectoBackendChE1.*" --drop --gzip ./backups
    ```
1. Abre el proyecto en Visual Studio Code:
    ``` sh
    code .
    ```

### URL del proyecto en Vercel
Puedes acceder a la versión desplegada del proyecto en la siguiente URL:
[PROYECTO](https://proyecto-backend-ch-e1-git-main-sergios-projects-23623fb3.vercel.app/)



### Estructura de directorios
El proyecto tiene la siguiente estructura de directorios:
```
├── backups/
│   └── proyectoBackendChE1/   # Backup de la base de datos del proyecto.
└── src/
    ├── config/                # Archivos de configuración del proyecto.
    ├── constants/             # Constantes utilizadas en el proyecto.
    ├── managers/              # Gestión y lógica de negocios.
    ├── models/                # Modelos de datos y esquemas de Mongoose.
    ├── public/                # Archivos estáticos públicos.
    │   ├── css/               # Estilos empleados en el FrontEnd.
    │   ├── icons/             # Iconos utilizados en el FrontEnd.
    │   ├── images/            # Imágenes de los productos.
    │   └── js/                # Archivos de JavaScript para el FrontEnd.
    ├── routes/                # Rutas del FrontEnd y Backend.
    │   └── api/               # Rutas específicas de API.
    ├── utils/                 # Utilidades y funciones auxiliares.
    └── views/                 # Vistas y plantillas para el FrontEnd.
        └── layouts/           # Plantilla base.

```

### ¿Te ha gustado este proyecto?
Si encuentras útil este proyecto, ¡no dudes en darle una estrella! ⭐ Tu apoyo es muy apreciado y motiva a seguir trabajando en proyectos futuros.