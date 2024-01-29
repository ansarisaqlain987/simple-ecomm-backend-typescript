import {
  getMyOrders,
  getOrderDetails,
  listOrders,
  placeOrder,
} from '../controllers/order.controller'
import {
  authenticateForAdmin,
  authenticateForAny,
  authenticateForUser,
} from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validator.middleware'
import { Router } from '../types'
import { ValidationSchema } from '../validation/schema'

export const getOrderRoutes = (router: Router) => {
  router.post(
    '/place',
    validate(ValidationSchema.order.placeOrder),
    authenticateForUser,
    placeOrder,
  )

  router.get('/details/:id', authenticateForAny, getOrderDetails)

  router.get('/', authenticateForUser, getMyOrders) // user orders

  router.get('/list', authenticateForAdmin, listOrders)

  return router
}
