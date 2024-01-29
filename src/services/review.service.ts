import { ReviewModel } from '../models/review.model'
import { IReview } from '../types'

export const saveReview = async (data: IReview) => {
  const review = await ReviewModel.create(data)
  review.save()
  return review
}

export const getProductReviews = (filters: object = {}) => {
  return ReviewModel.find(filters).exec()
}
