import { Schema, model } from 'mongoose'
import { IReview } from '../types'

const reviewSchema = new Schema<IReview>(
  {
    comment: { type: String, required: true },
    user: { type: String, required: true },
    product: { type: String, required: true },
    rating: { type: Number, required: true, default: -1 },
  },
  {
    timestamps: true,
  },
)

export const ReviewModel = model('Review', reviewSchema, 'reviews')
