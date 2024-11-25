import { Component, OnInit } from '@angular/core';
import { SQLiteService } from '../services/sqlite.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
  newUser = {
    id: 0, // Para identificar un usuario al editar
    name: '',
    rut: 0,
    username: '',
    email: '',
    password: '',
  };

  users: any[] = []; // Lista de usuarios para mostrar en la interfaz

  constructor(private sqliteService: SQLiteService) {}

  async ngOnInit() {
    await this.sqliteService.initializeDatabase();
    await this.loadUsers();
  }

  async addUser() {
    try {
      if (
        this.newUser.name &&
        this.newUser.rut &&
        this.newUser.username &&
        this.newUser.email &&
        this.newUser.password
      ) {
        if (this.newUser.id) {
          // Editar usuario existente
          await this.sqliteService.updateUser(this.newUser);
          console.log('Usuario actualizado con éxito:', this.newUser);
        } else {
          // Agregar nuevo usuario
          await this.sqliteService.addUser(this.newUser);
          console.log('Usuario agregado con éxito:', this.newUser);
        }

        // Limpia los datos del formulario después de guardar
        this.newUser = {
          id: 0,
          name: '',
          rut: 0,
          username: '',
          email: '',
          password: '',
        };

        await this.loadUsers();
      } else {
        console.error('Por favor, completa todos los campos obligatorios.');
      }
    } catch (error) {
      console.error('Error al agregar o actualizar usuario:', error);
    }
  }

  async loadUsers() {
    try {
      this.users = await this.sqliteService.getUsers();
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  }

  async editUser(user: any) {
    this.newUser = { ...user }; // Carga los datos en el formulario
  }

  async deleteUser(userId: number) {
    try {
      await this.sqliteService.deleteUser(userId);
      console.log('Usuario eliminado con éxito:', userId);
      await this.loadUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  }
}
