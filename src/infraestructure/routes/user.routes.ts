import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export const configureUserRoutes = (userController: UserController): Router => {
  const router = Router();
  
  router.post('/users', (req, res) => userController.createUser(req, res));
  
  return router;
};
