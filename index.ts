import express from 'express';
import cors from 'cors';
import dbConfig from './src/infraestructure/config/database';
import { PostgresUserRepository } from './src/infraestructure/repositories/postgres-user.repository';
import { CreateUserUseCase } from './src/application/usecases/create-user';
import { UserController } from './src/infraestructure/controllers/user.controller';
import { configureUserRoutes } from './src/infraestructure/routes/user.routes';

const userRepository = new PostgresUserRepository(dbConfig);
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, 'Headers:', req.headers);
  next();
});

app.use('/api', configureUserRoutes(userController));

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
