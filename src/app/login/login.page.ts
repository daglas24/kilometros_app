import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SQLiteService } from '../services/sqlite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  passwordError: string | null = null;

  constructor(private router: Router, private sqliteService: SQLiteService) {}

  async onSubmit(form: NgForm) {
    if (form.valid) {
      const { username, password } = form.value;

      try {
        const isAuthenticated = await this.sqliteService.authenticateUser(username, password);

        if (isAuthenticated) {
          // Redirige al usuario a la página de combustible
          this.router.navigate(['/combustible']);
        } else {
          // Muestra un mensaje de error si las credenciales son incorrectas
          this.passwordError = 'Credenciales incorrectas. Verifica tu usuario y contraseña.';
        }
      } catch (error) {
        console.error('Error al autenticar usuario:', error);
        this.passwordError = 'Ocurrió un error al iniciar sesión. Intenta de nuevo.';
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  // Método para cerrar el modal
  closeModal() {
    const modal = document.querySelector('ion-modal');
    if (modal) {
      modal.dismiss();
    }
  }
}
