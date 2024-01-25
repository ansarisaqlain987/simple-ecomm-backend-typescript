import {
  addProduct,
  updateProduct,
  deleteProduct,
  productDetails,
  productList,
} from '../controllers/product.controller';
import { authenticateForAdmin } from '../middlewares/auth.middleware';
import { Router } from '../types';

export const getProductRoutes = (router: Router) => {
  // ========== Admin APIs ==========
  // ----- POST -----
  router.post('/', authenticateForAdmin, addProduct);
  router.post('/:id', authenticateForAdmin, updateProduct);
  router.post('/delete/:id', authenticateForAdmin, deleteProduct);
  //-----------------

  // ----- GET -----
  router.get('/', productDetails);
  router.get('/list', productList);
  // ---------------
  // ================================

  return router;
};
