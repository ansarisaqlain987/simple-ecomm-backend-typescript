import { Schema, model } from "mongoose";
import { IProduct } from "../types";

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    images: [{ type: String, required: false }],
    price: { type: Number, required: true }
}, {
    timestamps: true
});

export const ProductModel = model('Product', productSchema, 'products');