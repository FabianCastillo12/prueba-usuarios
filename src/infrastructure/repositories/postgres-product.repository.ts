import { QueryResult } from 'pg';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/ports/product.repository';
import { DatabaseService } from '../database/database.service';
import { PRODUCT_QUERIES } from '../database/queries';

export class PostgresProductRepository implements ProductRepository {
  private dbService: DatabaseService;

  constructor(dbConfig: any) {
    this.dbService = new DatabaseService(dbConfig);
  }

  async getProducts(): Promise<Product[]> {
    try {
      const result: QueryResult = await this.dbService.executeQuery(PRODUCT_QUERIES.GET_PRODUCTS);
      return result.rows as Product[];
    } catch (error: any) {
      throw new Error(`Error al obtener productos de la base de datos: ${error.message}`);
    }
  }
}
