import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El nombre debe tener como máximo 25 caracteres" ],
        index: { name: "idx_title" },
    },
    description: {
        type: String,
        trim: true,
        maxLength: [ 250, "La descripción debe tener como máximo 250 caracteres" ],
    },
    code: {
        type: String,
        required: [ true, "El código es obligatorio" ],
        uppercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: async function (code) {
                const countDocuments = await this.model("products").countDocuments({
                    _id: { $ne: this._id },
                    code, // Atributo de verificación de duplicado
                });
                return countDocuments === 0;
            },
            message: "El código ya está registrado",
        },
    },
    price: {
        type: Number,
        required: [ true, "El precio es obligatorio" ],
        min: [ 0, "El precio debe ser un valor positivo" ],
    },
    stock: {
        type: Number,
        required: [ true, "El stock es obligatorio" ],
        min: [ 0, "El stock debe ser un valor positivo" ],
    },
    status: {
        type: Boolean,
        required: [ true, "El estado es obligatorio" ],
    },
    availability: {
        type: Boolean,
        required: [ true, "La disponibilidad es obligatoria" ],
    },
    category: {
        type: String,
        required: [ true, "La categoría es obligatoria" ],
        uppercase: true,
        trim: true,
    },
    thumbnail: {
        type: String,
        required: [ true, "La imagen es obligatoria" ],
        trim: true,
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

// Middleware que elimina la referencia en los carritos al eliminar el producto.
productSchema.pre("deleteOne", async function(next) {
    try {
        const Cart = model("carts");

        await Cart.updateMany(
            { "products.product": this._id },
            { $pull: { products: { product: this._id } } },
        );

        next();
    } catch (error) {
        next(error);
    }
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
productSchema.plugin(paginate);

const Product = model("products", productSchema);

export default Product;