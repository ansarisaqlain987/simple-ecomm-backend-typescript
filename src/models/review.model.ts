import { Schema, model } from "mongoose";
import { IReview } from "../types";

const reviewSchema = new Schema<IReview>({
    description: { type: String, required: true },
    user: { type: String, required: true },
    product: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
});

export const ProductModel = model('Review', reviewSchema, 'reviews');