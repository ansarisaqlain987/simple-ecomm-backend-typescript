import {
  addProduct,
  updateProduct,
  deleteProduct,
  productDetails,
  productList,
} from '../controllers/product.controller'
import { authenticateForAdmin } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validator.middleware'
import { Router } from '../types'
import { ValidationSchema } from '../validation/schema'

export const getProductRoutes = (router: Router) => {
  router.post(
    '/',
    validate(ValidationSchema.product.addProduct),
    authenticateForAdmin,
    addProduct,
  )

  router.post(
    '/:id',
    validate(ValidationSchema.product.updateProduct),
    authenticateForAdmin,
    updateProduct,
  )

  router.post('/delete/:id', authenticateForAdmin, deleteProduct)

  router.get('/details/:id', productDetails)

  router.get('/list', productList)

  return router
}
