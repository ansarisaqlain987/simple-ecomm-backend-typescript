import { addReview, getReviews } from '../controllers/review.controller'
import { authenticateForUser } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validator.middleware'
import { Router } from '../types'
import { ValidationSchema } from '../validation/schema'

export const getReviewRoutes = (router: Router) => {
  router.post(
    '/add',
    validate(ValidationSchema.review.addReview),
    authenticateForUser,
    addReview,
  )

  router.get('/:id', authenticateForUser, getReviews)

  return router
}
