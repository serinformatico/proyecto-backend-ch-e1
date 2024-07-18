import { Router } from "express";
import ProductManager from "../managers/product.manager.js";

import {
    ERROR_SERVER,
} from "../constants/messages.constant.js";

const router = Router();
const productManager = new ProductManager();
const currentCartId = "66afb410c37231583bdbf367"; // Aquí coloca el ID del carrito creado en tu BD

router.get("/", async (req, res) => {
    try {
        const data = await productManager.getAll(req.query);
        data.sort = req.query?.sort ? `&sort=${req.query.sort}` : "";
        data.currentCartId = currentCartId;
        data.docs = data.docs.map((doc) => {
            return { ...doc, currentCartId };
        });

        res.status(200).render("index", { title: "Inicio", data });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, ERROR_SERVER });
    }
});

router.get("/real-time-products", async (req, res) => {
    try {
        res.status(200).render("realTimeProducts", { title: "Tiempo Real" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, ERROR_SERVER });
    }
});

export default router;