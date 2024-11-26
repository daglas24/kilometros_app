import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, AnimationController } from '@ionic/angular';
import { SQLiteService } from '../services/sqlite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('modal', { static: false }) modal!: IonModal;
  passwordError: string | null = null;

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private sqliteService: SQLiteService
  ) {}

  ngOnInit() {
    const loginFormElement = document.querySelector('.login-form');
    if (loginFormElement) {
      const loginFormAnimation = this.animationCtrl
        .create()
        .addElement(loginFormElement)
        .duration(500)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'translateY(-100px)' },
          { offset: 1, opacity: '1', transform: 'translateY(0)' },
        ]);

      loginFormAnimation.play();
    }
  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      const { username, password } = form.value;

      try {
        // Autenticar al usuario
        const isAuthenticated = await this.sqliteService.authenticateUser(username, password);

        if (isAuthenticated) {
          this.router.navigate(['/combustible']); // Redirige si las credenciales son correctas
        } else {
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

  closeModal() {
    this.modal.dismiss();
  }
}
