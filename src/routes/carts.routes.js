import { Router } from "express";
import moment from "moment";
import CartManager from "../managers/cart.manager.js";

import {
    ERROR_SERVER,
} from "../constants/messages.constant.js";

const router = Router();
const cartManager = new CartManager();

router.get("/:id", async (req, res) => {
    try {
        const data = await cartManager.getOneById(req.params.id);
        data.createdAt = moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss");
        data.updatedAt = moment(data.updatedAt).format("YYYY-MM-DD HH:mm:ss");

        res.status(200).render("cart", { title: "Carrito", data });
    } catch (error) {
        res.status(500).json({ status: false, ERROR_SERVER });
    }
});

export default router;