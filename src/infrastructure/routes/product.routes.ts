import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

export const configureProductRoutes = (productController: ProductController): Router => {
  const router = Router();
  
  router.get('/obtener-productos', (req, res) => productController.getProducts(req, res));
  
  return router;
};
