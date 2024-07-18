import path from "path";

// Obtiene la ruta del directorio raíz del proyecto
const ROOT_PATH = path.resolve();

// Definición de las rutas relativas del proyecto
const paths = {
    root: ROOT_PATH,
    env: path.join(ROOT_PATH, ".env"),
    src: path.join(ROOT_PATH, "src"),
    public: path.join(ROOT_PATH, "src", "public"),
    images: path.join(ROOT_PATH, "src", "public", "images"),
    views: path.join(ROOT_PATH, "src", "views"),
};

export default paths;