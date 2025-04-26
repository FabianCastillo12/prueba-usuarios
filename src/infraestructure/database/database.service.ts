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
  
  async initialize(): Promise<void> {
    try {
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          correo VARCHAR(100) UNIQUE NOT NULL,
          edad INTEGER NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Tabla de usuarios verificada/creada correctamente');
    } catch (error: any) {
      console.error('Error al inicializar la base de datos:', error);
      throw error;
    }
  }
}
