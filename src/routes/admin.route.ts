import {
  addAdmin,
  adminLogin,
  details,
  resetPassword,
  updateAdmin,
} from '../controllers/admin.controller'
import { authenticateForAdmin } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validator.middleware'
import { Router } from '../types'
import { ValidationSchema } from '../validation/schema'

export const getAdminRoutes = (router: Router) => {
  // ----- POST -----
  router.post('/', validate(ValidationSchema.admin.addAdmin), addAdmin)

  router.post(
    '/update',
    authenticateForAdmin,
    validate(ValidationSchema.admin.updateAdmin),
    updateAdmin,
  )

  router.post(
    '/resetPassword',
    authenticateForAdmin,
    validate(ValidationSchema.admin.resetPassword),
    resetPassword,
  )

  router.post('/login', validate(ValidationSchema.admin.login), adminLogin)

  // ----- GET -----
  router.get('/', authenticateForAdmin, details)

  return router
}
