import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('modal', { static: false }) modal!: IonModal;
  passwordError: string | null = null;

  constructor(private router: Router, private animationCtrl: AnimationController) {}

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
        // Redirigir a la página de combustible
        this.router.navigate(['/combustible']);
      } else {
        // Mostrar error si la contraseña no es válida
        this.passwordError = 'La contraseña debe tener al menos 4 números, 3 caracteres y 1 mayúscula.';
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  isPasswordValid(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumeric = /\d{4}/.test(password); // Al menos 4 números
    const hasLetter = /[a-zA-Z]{3}/.test(password); // Al menos 3 letras
    const minLength = 8;

    return hasUpperCase && hasNumeric && hasLetter && password.length >= minLength;
  }

  closeModal() {
    this.modal.dismiss();
  }
}