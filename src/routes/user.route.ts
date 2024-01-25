import {
  details,
  login,
  registerUser,
  resetPassword,
  updateUser,
  userList,
} from '../controllers/user.controller';
import {
  authenticateForAdmin,
  authenticateForUser,
} from '../middlewares/auth.middleware';
import { Router } from '../types';

export const getUserRoutes = (router: Router) => {
  // ========== Admin APIs ==========
  // ----- POST -----
  router.post('/', registerUser);
  router.post('/update', authenticateForUser, updateUser);
  router.post('/resetPassword', authenticateForUser, resetPassword);
  router.post('/login', login);
  //-----------------

  // ----- GET -----
  router.get('/', authenticateForUser, details);
  router.get('/list', authenticateForAdmin, userList);
  // ---------------
  // ================================

  return router;
};
