import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/usecases/create-user';

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      console.log('Request body:', req.body);
      
      if (!req.body) {
        res.status(400).json({
          success: false,
          errors: ['No se recibieron datos. Asegúrate de enviar un cuerpo en formato JSON.']
        });
        return;
      }
      
      const { nombre, correo, edad } = req.body;

      if (!nombre || !correo || edad === undefined) {
        res.status(400).json({
          success: false,
          errors: ['Faltan campos requeridos: nombre, correo y edad son obligatorios']
        });
        return;
      }

      const result = await this.createUserUseCase.execute({
        nombre,
        correo,
        edad: Number(edad)
      });

      if (result.success) {
        res.status(201).json({
          success: true,
          data: result.data
        });
      } else {
        res.status(400).json({
          success: false,
          errors: result.errors
        });
      }
    } catch (error: any) {
      console.error('Error en el controlador de creación de usuario:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Error interno del servidor'
      });
    }
  }
}
