import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SQLiteService } from '../services/sqlite.service';
import { createAnimation } from '@ionic/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {
  passwordError: string | null = null;

  constructor(private router: Router, private sqliteService: SQLiteService) {}

  async onSubmit(form: NgForm) {
    if (form.valid) {
      const { username, password } = form.value;

      try {
        const isAuthenticated = await this.sqliteService.authenticateUser(username, password);

        if (isAuthenticated) {
          this.router.navigate(['/combustible']);
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
    const modal = document.querySelector('ion-modal');
    if (modal) {
      modal.dismiss();
    }
  }

  ngAfterViewInit() {
    this.animateElements();
  }

  animateElements() {
    const animatedImage = document.querySelector('.animated-image');
    if (animatedImage) {
      const imageAnimation = createAnimation()
        .addElement(animatedImage)
        .duration(1000)
        .keyframes([
          { offset: 0, transform: 'scale(0.5)', opacity: '0' },
          { offset: 1, transform: 'scale(1)', opacity: '1' },
        ]);
      imageAnimation.play();
    }
  
    const formItems = document.querySelectorAll('.animated-item');
    if (formItems.length > 0) {
      const formAnimation = createAnimation()
        .addElement(formItems)
        .duration(800)
        .keyframes([
          { offset: 0, transform: 'translateY(20px)', opacity: '0' },
          { offset: 1, transform: 'translateY(0)', opacity: '1' },
        ]);
      formAnimation.play();
    }
  
    const buttons = document.querySelectorAll('.animated-button');
    if (buttons.length > 0) {
      const buttonAnimation = createAnimation()
        .addElement(buttons)
        .duration(800)
        .keyframes([
          { offset: 0, transform: 'scale(0.8)', opacity: '0' },
          { offset: 1, transform: 'scale(1)', opacity: '1' },
        ]);
      buttonAnimation.play();
    }
  }
  
}
