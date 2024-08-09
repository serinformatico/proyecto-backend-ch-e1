import express from "express";
import paths from "./utils/paths.js";

import { config as dotenvConfig } from "dotenv";
import { connectDB } from "./config/mongoose.config.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configSocket } from "./config/socket.config.js";

import apiCartRouter from "./routes/api/cart.routes.js";
import apiProductRouter from "./routes/api/product.routes.js";
import cartRouter from "./routes/carts.routes.js";
import homeRouter from "./routes/home.routes.js";
import productRouter from "./routes/products.routes.js";

const server = express();

// Decodificadores del BODY
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Declaración de ruta estática
server.use("/public", express.static(paths.public));

// Variables de entorno
dotenvConfig({ path: paths.env });

// Motor de plantillas
configHandlebars(server);

// Conexión con la Base de Datos
connectDB();

// Enrutadores
server.use("/api/carts", apiCartRouter);
server.use("/api/products", apiProductRouter);
server.use("/carts", cartRouter);
server.use("/", homeRouter);
server.use("/products", productRouter);

// Control de rutas inexistentes
server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

// Control de errores internos
server.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

// Método oyente de solicitudes
const serverHTTP = server.listen(process.env.PORT, () => {
    console.log(`Ejecutándose en http://localhost:${process.env.PORT}`);
});

// Servidor de WebSocket
configSocket(serverHTTP);