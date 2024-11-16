import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, AnimationController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Importa el servicio

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
    private authService: AuthService // Inyecta el servicio
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

  onSubmit(form: NgForm) {
    if (form.valid) {
      const password = form.value.password;
      if (this.isPasswordValid(password)) {
        this.authService.setUsername(form.value.username); // Guarda el nombre de usuario
        this.router.navigate(['/combustible']); // Redirige a la página de combustible
      } else {
        this.passwordError = 'La contraseña debe tener al menos 4 números, 3 caracteres y 1 mayúscula.';
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  isPasswordValid(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumeric = /\d{4}/.test(password);
    const hasLetter = /[a-zA-Z]{3}/.test(password);
    const minLength = 8;

    return hasUpperCase && hasNumeric && hasLetter && password.length >= minLength;
  }

  closeModal() {
    this.modal.dismiss();
  }
}
