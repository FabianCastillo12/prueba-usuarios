import { QueryResult } from 'pg';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/ports/user.repository';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { USER_QUERIES } from '../database/queries';

export class PostgresUserRepository implements UserRepository {
  private dbService: DatabaseService;

  constructor(dbConfig: any) {
    this.dbService = new DatabaseService(dbConfig);
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const id = uuidv4();
    const createdAt = new Date();
    
    try {
      const values = [id, userData.nombre, userData.correo, userData.edad, createdAt];
        const result: QueryResult = await this.dbService.executeQuery(USER_QUERIES.CREATE_USER, values);
      
      return result.rows[0] as User;
    } catch (error: any) {
      if (error.message && error.message.includes('Violación de restricción única')) {
        throw new Error('Ya existe un usuario con este correo electrónico');
      }
      
      throw new Error(`Error al crear usuario en la base de datos: ${error.message}`);
    }
  }
}
