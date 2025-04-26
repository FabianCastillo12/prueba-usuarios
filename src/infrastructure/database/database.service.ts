import { Pool, QueryResult } from 'pg';

export class DatabaseService {
  private pool: Pool;
  
  constructor(dbConfig: any) {
    this.pool = new Pool(dbConfig);
  }

  async executeQuery(query: string, params: any[] = []): Promise<QueryResult> {
    try {
      return await this.pool.query(query, params);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new Error(`Violación de restricción única: ${error.constraint}`);
      }
      
      throw new Error(`Error de base de datos: ${error.message}`);
    }
  }

  async beginTransaction() {
    const client = await this.pool.connect();
    await client.query('BEGIN');
    return client;
  }
  
}
