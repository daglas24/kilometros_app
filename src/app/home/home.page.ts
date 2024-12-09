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
      // Asegúrate de que la base de datos se haya inicializado antes de hacer algo
      await this.sqliteService.init();
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  async onSubmit(form: any) {
    if (form.valid) {
      try {
        const { name, rut, username, email, password } = form.value;

        // Llamar al servicio para agregar el usuario
        const success = await this.sqliteService.addUser(name, rut, username, email, password);

        if (success) {
          console.log('Usuario agregado:', form.value);
          this.router.navigate(['/combustible']);
        } else {
          alert('Hubo un error al agregar el usuario.');
        }
      } catch (error) {
        console.error('Error al agregar usuario:', error);
        alert('Error al registrar el usuario. Intente de nuevo.');
      }

      form.reset();
    } else {
      console.error('Formulario inválido. Revisa los campos.');
    }
  }
}
