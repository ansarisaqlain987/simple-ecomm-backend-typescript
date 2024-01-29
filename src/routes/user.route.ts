import {
  details,
  login,
  registerUser,
  resetPassword,
  updateUser,
  userList,
} from '../controllers/user.controller'
import {
  authenticateForAdmin,
  authenticateForUser,
} from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validator.middleware'
import { Router } from '../types'
import { ValidationSchema } from '../validation/schema'

export const getUserRoutes = (router: Router) => {
  router.post('/', validate(ValidationSchema.user.addUser), registerUser)

  router.post(
    '/update',
    validate(ValidationSchema.user.updateUser),
    authenticateForUser,
    updateUser,
  )

  router.post(
    '/resetPassword',
    validate(ValidationSchema.user.resetPassword),
    authenticateForUser,
    resetPassword,
  )

  router.post('/login', validate(ValidationSchema.user.login), login)

  router.get('/', authenticateForUser, details)

  router.get('/list', authenticateForAdmin, userList)

  return router
}
