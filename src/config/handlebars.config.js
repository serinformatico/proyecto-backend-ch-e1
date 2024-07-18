import handlebars from "express-handlebars";
import paths from "../utils/paths.js";

// Configura el servidor para usar Handlebars como motor de plantillas
export const config = (server) => {
    // Registra el motor de plantillas Handlebars
    server.engine("handlebars", handlebars.engine());

    // Establece la carpeta donde se encuentran las vistas
    server.set("views", paths.views);

    // Define Handlebars como el motor de vistas por defecto
    server.set("view engine", "handlebars");
};