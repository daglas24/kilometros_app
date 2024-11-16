import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private db: any = null;  // Usa 'any' temporalmente para evitar problemas de tipo

  constructor() { 
    this.init();
  }

  init(){
    this.createDatabase();
  }

  // Crear y abrir la base de datos
  async createDatabase(): Promise<void> {
    try {
      // Crear una conexión a la base de datos
      const connection = await CapacitorSQLite.createConnection({
        database: 'users.db',
        version: 1,
        encrypted: false,
        mode: 'no-encryption',
      });

        this.db = connection;  // Asigna la conexión correctamente

        // Abrir la base de datos
        await this.db.open();

        // Crear la tabla de usuarios si no existe
        await this.db.execute(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
          )
        `);
    } catch (e) {
      console.error('Error creating database:', e);
    }
  }

  // Crear un nuevo usuario
  async createUser(name: string, email: string, password: string): Promise<void> {
    if (!this.db) {
      console.error('Database not initialized');
      return;
    }
    try {
      // Asegúrate de que la conexión esté activa antes de ejecutar la consulta
      await this.db.execute(`
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `, [name, email, password]);

      console.log('User created');
    } catch (e) {
      console.error('Error creating user:', e);
    }
  }

  // Obtener todos los usuarios
  async getUsers(): Promise<any[]> {
    if (!this.db) {
      console.error('Database not initialized');
      return [];
    }
    try {
      // Asegúrate de que la conexión esté activa antes de ejecutar la consulta
      const result = await this.db.query('SELECT * FROM users');
      return result.values;
    } catch (e) {
      console.error('Error getting users:', e);
      return [];
    }
  }

  // Actualizar un usuario
  async updateUser(id: number, name: string, email: string, password: string): Promise<void> {
    if (!this.db) {
      console.error('Database not initialized');
      return;
    }
    try {
      await this.db.execute(`
        UPDATE users
        SET name = ?, email = ?, password = ?
        WHERE id = ?
      `, [name, email, password, id]);

      console.log('User updated');
    } catch (e) {
      console.error('Error updating user:', e);
    }
  }

  // Eliminar un usuario
  async deleteUser(id: number): Promise<void> {
    if (!this.db) {
      console.error('Database not initialized');
      return;
    }
    try {
      await this.db.execute('DELETE FROM users WHERE id = ?', [id]);

      console.log('User deleted');
    } catch (e) {
      console.error('Error deleting user:', e);
    }
  }

  // Cerrar la base de datos
  async closeDatabase(): Promise<void> {
    if (this.db) {
      await this.db.close();
      console.log('Database closed');
    }
  }
}
