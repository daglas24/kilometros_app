import { Injectable, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';





@Injectable({
  providedIn: 'root',
})
export class SQLiteService implements OnInit{
  private db!: SQLiteObject;
  private isDbInitialized = false;

  constructor(private sqlite: SQLite) {
    this.init();
  }

  ngOnInit() {
    this.init();
  }


  // Método para inicializar la base de datos
  async init() {
    try {
      // Si la base de datos ya está inicializada, no hacemos nada
      if (this.isDbInitialized) return;

      // Crear la base de datos
      this.db = await this.sqlite.create({
        name: 'app_database.db',
        location: 'default'
      });

      console.log('Base de datos creada');
      await this.createTable();
      console.log('Tablas creadas');
      this.isDbInitialized = true; // Marcar la base de datos como inicializada
    } catch (error) {
      console.log('Error al inicializar la base de datos', error);
      throw new Error('Error al inicializar la base de datos');
    }
  }

  // Método para crear las tablas
  async createTable() {
    try {
      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          rut INTEGER NOT NULL,
          username TEXT NOT NULL UNIQUE,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `);
      console.log('Tabla "users" creada exitosamente');
    } catch (error) {
      console.error('Error al crear la tabla "users":', error);
    }
  }

  // Método para agregar un usuario
  public async addUser(name: string, rut: number, username: string, email: string, password: string): Promise<boolean> {
    const passwordRegex = /^(?=(?:.*\d){4})(?=(?:.*[a-zA-Z]){3})(?=.*[A-Z]).{8,}$/;
    
    // Validar la contraseña
    if (!passwordRegex.test(password)) {
      alert('La contraseña no cumple con los requisitos. Debe tener al menos 8 caracteres, una letra mayúscula y 4 números.');
      return false;
    }

    try {
      // Asegurarse de que la base de datos esté inicializada
      if (!this.isDbInitialized) {
        throw new Error('La base de datos no está inicializada.');
      }

      // Definir los datos para insertar
      const data = [name, rut, username, email, password];
      
      // Ejecutar la consulta SQL
      await this.db.executeSql(
        `INSERT INTO users (name, rut, username, email, password) VALUES (?, ?, ?, ?, ?)`,
        data
      );
      
      alert('Usuario registrado correctamente');
      return true;
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Error al registrar el usuario: ' + error);
      return false;
    }
  }

  // Método para autenticar un usuario
  async authenticateUser(usernameOrEmail: string, password: string): Promise<boolean> {
    if (!this.isDbInitialized) {
      throw new Error('La base de datos no está inicializada.');
    }
  
    if (!this.db) throw new Error('No hay conexión con la base de datos.');
  
    const query = `
      SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?;
    `;
    const result = await this.db.executeSql(query, [usernameOrEmail, usernameOrEmail, password]);
  
    // Verifica si hay resultados (usuario encontrado)
    return result.rows.length > 0;
  }


  async logout() {
    try {
      console.log('Sesión cerrada correctamente');
      return true;
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      return false;
    }
  }
}

