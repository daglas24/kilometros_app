import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Importa el servicio

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  users: any[] = [];
  newUserName: string = '';
  newUserEmail: string = '';
  newUserPassword: string = '';

  constructor(private sqliteService: SqliteService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.initializeDatabase();
  }

  // Inicializar la base de datos
  async initializeDatabase() {
    await this.sqliteService.createDatabase();
    this.loadUsers();
  }

  // Cargar los usuarios desde la base de datos
  async loadUsers() {
    this.users = await this.sqliteService.getUsers();
  }

  // Crear un nuevo usuario
  async createUser() {
    await this.sqliteService.createUser(this.newUserName, this.newUserEmail, this.newUserPassword);
    this.loadUsers(); // Recargar usuarios
  }

  // Eliminar un usuario
  async deleteUser(id: number) {
    await this.sqliteService.deleteUser(id);
    this.loadUsers(); // Recargar usuarios
  }

  // Actualizar un usuario
  async updateUser(id: number) {
    await this.sqliteService.updateUser(id, this.newUserName, this.newUserEmail, this.newUserPassword);
    this.loadUsers(); // Recargar usuarios
  }

  // Cerrar la base de datos
  async closeDatabase() {
    await this.sqliteService.closeDatabase();
  }

  
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.setUsername(form.value.username); // Guarda el nombre de usuario
      this.router.navigate(['/combustible']); // Redirige a la página de combustible
    } else {
      console.log('Formulario no válido');
    }
  }
}
