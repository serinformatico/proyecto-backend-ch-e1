import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import { isValidID } from "../config/mongoose.config.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_INDEX,
} from "../constants/messages.constant.js";

export default class CartManager {
    #cart;

    constructor() {
        this.#cart = Cart;
    }

    #handleError = (error) => {
        if (error instanceof mongoose.Error.ValidationError) {
            throw new Error(Object.values(error.errors)[0].message);
        }

        throw new Error(error.message);
    };

    #validateId = (id) => {
        if (!isValidID(id)) throw new Error(ERROR_INVALID_ID);
    };

    #findOneById = async (id) => {
        this.#validateId(id);

        const cartFound = await this.#cart.findOne({ _id: id }).populate("products.product");
        if (!cartFound) throw new Error(ERROR_NOT_FOUND_ID);

        return cartFound;
    };

    getAll = async (paramFilters) => {
        try {
            const paginationOptions = {
                limit: paramFilters?.limit ?? 10,
                page: paramFilters?.page ?? 1,
                populate: "products.product",
                lean: true,
            };

            const cartsFound = await this.#cart.paginate({}, paginationOptions);
            return cartsFound;
        } catch (error) {
            this.#handleError(error);
        }
    };

    getOneById = async (id) => {
        try {
            const cartFound = await this.#findOneById(id);
            return cartFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    insertOne = async (data) => {
        try {
            const cart = new Cart(data);

            await cart.save();
            return cart.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    updateOneById = async (id, data) => {
        try {
            const cartFound = await this.#findOneById(id);

            cartFound.set(data);
            await cartFound.save();
            return cartFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    deleteOneById = async (id) => {
        try {
            const cartFound = await this.#findOneById(id);

            await this.#cart.deleteOne({ _id: cartFound._id });
            return cartFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    addOneProduct = async (id, productId, quantity) => {
        try {
            this.#validateId(productId);
            const cartFound = await this.#findOneById(id);

            const currentIndex = cartFound.products.findIndex((item) => item.product._id.toString() === productId);
            if (currentIndex >= 0) {
                const product = cartFound.products[currentIndex];
                product.quantity += quantity;
                cartFound.products[currentIndex] = product;
            } else {
                cartFound.products.push({ product: productId, quantity });
            }

            await cartFound.save();
            return cartFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    removeOneProduct = async (id, productId, quantity) => {
        try {
            this.#validateId(productId);
            const cartFound = await this.#findOneById(id);

            const currentIndex = cartFound.products.findIndex((item) => item.product._id.toString() === productId);
            if (currentIndex < 0) {
                throw new Error(ERROR_NOT_FOUND_INDEX);
            }

            const product = cartFound.products[currentIndex];
            if (product.quantity > quantity) {
                product.quantity -= quantity;
                cartFound.products[currentIndex] = product;
            } else {
                cartFound.products.splice(currentIndex, 1);
            }

            await cartFound.save();
            return cartFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    removeAllProducts = async (id) => {
        try {
            const cartFound = await this.#findOneById(id);

            cartFound.products = [];
            await cartFound.save();
            return cartFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };
}