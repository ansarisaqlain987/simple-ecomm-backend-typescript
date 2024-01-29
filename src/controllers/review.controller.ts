import { getProductReviews, saveReview } from '../services/review.service'
import { Controller, Request, Response } from '../types'
import { Logger } from '../utils/logger.util'
import { getErrorResponse } from '../utils/response.util'

type InputAddReview = {
  comment: string
  rating: number
  product: string
}
export const addReview: Controller = async (
  request: Request<InputAddReview>,
  response: Response,
) => {
  try {
    const { id = '' } = request.user ?? {}
    const { product, rating, comment } = request.body
    const record = await saveReview({
      user: id,
      product: product,
      rating: rating,
      comment: comment,
    })
    return response.status(201).send({
      data: {
        _id: record._id,
      },
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}

export const getReviews: Controller = async (
  request: Request<object, { id: string }>,
  response: Response,
) => {
  try {
    const { id } = request.params
    const record = await getProductReviews({ product: id })

    return response.status(record ? 200 : 204).send({
      data: record,
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}
