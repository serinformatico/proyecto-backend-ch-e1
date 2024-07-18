import { Router } from "express";
import CartManager from "../../managers/cart.manager.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../../constants/messages.constant.js";

const router = Router();
const cartManager = new CartManager();

const handleError = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    return res.status(500).json({ status: false, message });
};

router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getAll(req.query);
        res.status(200).json({ status: true, payload: carts });
    } catch (error) {
        handleError(res, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const cart = await cartManager.getOneById(req.params.id);
        res.status(200).json({ status: true, payload: cart });
    } catch (error) {
        handleError(res, error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const cart = await cartManager.insertOne(req.body);
        res.status(201).json({ status: true, payload: cart });
    } catch (error) {
        handleError(res, error.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const cart = await cartManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: true, payload: cart });
    } catch (error) {
        handleError(res, error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const cart = await cartManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: cart });
    } catch (error) {
        handleError(res, error.message);
    }
});

router.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartManager.addOneProduct(cid, pid, quantity ?? 1);
        res.status(200).json({ status: true, payload: cart });
    } catch (error) {
        handleError(res, error.message);
    }
});

router.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.removeOneProduct(cid, pid, 1);
        res.status(200).json({ status: true, payload: cart });
    } catch (error) {
        handleError(res, error.message);
    }
});

router.delete("/:cid/products", async (req, res) => {
    try {
        const cart = await cartManager.removeAllProducts(req.params.cid);
        res.status(200).json({ status: true, payload: cart });
    } catch (error) {
        handleError(res, error.message);
    }
});

export default router;