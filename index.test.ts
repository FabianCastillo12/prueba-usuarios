import request from 'supertest';
import express from 'express';
import { configureUserRoutes } from './src/infrastructure/routes/user.routes';
import { configureProductRoutes } from './src/infrastructure/routes/product.routes';

// Mock controllers para pruebas básicas
const mockUserController = {
  createUser: jest.fn((req, res) => res.status(201).json({ success: true })),
};
const mockProductController = {
  getProducts: jest.fn((req, res) => res.status(200).json({ products: [] })),
};

describe('App (index.ts)', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api', configureUserRoutes(mockUserController as any));
    app.use('/api', configureProductRoutes(mockProductController as any));
  });

  it('GET /api/obtener-productos debe responder 200', async () => {
      const res = await request(app).get('/api/obtener-productos');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('products');
    });

  it('POST /api/users debe responder 201', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Test', email: 'test@mail.com' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('success', true);
  });
});
