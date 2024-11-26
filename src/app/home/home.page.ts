import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SQLiteService } from '../services/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private sqliteService: SQLiteService, private router: Router) {}

  async ngOnInit() {
    try {
      // Inicializar la base de datos
      await this.sqliteService.initializeDatabase();
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  // Manejo del envío del formulario
  async onSubmit(form: any) {
    if (form.valid) {
      try {
        const { name, rut, username, email, password } = form.value;

        // Agregar el usuario a la base de datos
        await this.sqliteService.addUser({
          name,
          rut,
          username,
          email,
          password,
        });

        console.log('Usuario agregado:', form.value);

        // Redirigir a la página combustible
        this.router.navigate(['/combustible']);
      } catch (error) {
        console.error('Error al agregar usuario:', error);
      }
      form.reset(); // Limpia el formulario después de enviarlo
    } else {
      console.error('Formulario inválido. Revisa los campos.');
    }
  }
}
