import express from 'express';
import cors from 'cors';
import dbConfig from './src/infrastructure/config/database';
import { PostgresUserRepository } from './src/infrastructure/repositories/postgres-user.repository';
import { PostgresProductRepository } from './src/infrastructure/repositories/postgres-product.repository';
import { CreateUserUseCase } from './src/application/usecases/create-user';
import { GetProductsUseCase } from './src/application/usecases/get-products';
import { UserController } from './src/infrastructure/controllers/user.controller';
import { ProductController } from './src/infrastructure/controllers/product.controller';
import { configureUserRoutes } from './src/infrastructure/routes/user.routes';
import { configureProductRoutes } from './src/infrastructure/routes/product.routes';

// Repositorios
const userRepository = new PostgresUserRepository(dbConfig);
const productRepository = new PostgresProductRepository(dbConfig);

// Casos de uso
const createUserUseCase = new CreateUserUseCase(userRepository);
const getProductsUseCase = new GetProductsUseCase(productRepository);

// Controladores
const userController = new UserController(createUserUseCase);
const productController = new ProductController(getProductsUseCase);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, 'Headers:', req.headers);
  next();
});

// Configuración de rutas
app.use('/api', configureUserRoutes(userController));
app.use('/api', configureProductRoutes(productController));

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error no controlado:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
