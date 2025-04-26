import { Request, Response } from 'express';
import { GetProductsUseCase } from '../../application/usecases/get-products';

export class ProductController {
  constructor(private getProductsUseCase: GetProductsUseCase) {}

  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getProductsUseCase.execute();

      if (result.success) {
        res.status(200).json({
          success: true,
          data: result.data
        });
      } else {
        res.status(500).json({
          success: false,
          error: result.error
        });
      }
    } catch (error: any) {
      console.error('Error en el controlador de obtención de productos:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Error interno del servidor'
      });
    }
  }
}
