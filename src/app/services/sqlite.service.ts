import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  private db: SQLiteDBConnection | null = null;
  private readonly dbName = 'app_database';

  constructor() {}

  async initializeDatabase() {
    if (Capacitor.isNativePlatform()) {
      const sqlite = CapacitorSQLite;

      try {
        const connection = (await sqlite.createConnection({
          database: this.dbName,
          encrypted: false,
          mode: 'no-encryption',
          version: 1,
        })) as unknown as SQLiteDBConnection;

        if (connection) {
          this.db = connection;
          await this.db.open();

          const query = `
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              rut INTEGER NOT NULL,
              username TEXT NOT NULL UNIQUE,
              email TEXT NOT NULL UNIQUE,
              password TEXT NOT NULL
            );
          `;
          await this.db.execute(query);
        } else {
          throw new Error('No se pudo crear la conexión a la base de datos.');
        }
      } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        throw error;
      }
    } else {
      console.warn('SQLite solo está disponible en plataformas nativas.');
    }
  }

  async addUser(user: { name: string; rut: number; username: string; email: string; password: string }) {
    if (!this.db) throw new Error('Database not initialized.');
    const query = `
      INSERT INTO users (name, rut, username, email, password) 
      VALUES (?, ?, ?, ?, ?);
    `;
    await this.db.run(query, [user.name, user.rut, user.username, user.email, user.password]);
  }

  async authenticateUser(usernameOrEmail: string, password: string): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized.');
    const query = `
      SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?;
    `;
    const result = await this.db.query(query, [usernameOrEmail, usernameOrEmail, password]);
    return Array.isArray(result.values) && result.values.length > 0;
  }
}
