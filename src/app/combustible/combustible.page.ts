import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { createAnimation } from '@ionic/angular';

@Component({
  selector: 'app-combustible',
  templateUrl: './combustible.page.html',
  styleUrls: ['./combustible.page.scss'],
})
export class CombustiblePage implements OnInit {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.username = this.authService.getUsername() || 'Invitado';
    this.animateElements(); 
  }

  goToInicio() {
    this.router.navigate(['/inicio']);
  }

  animateElements() {
    const titleElement = document.querySelector('.animated-title');
    const welcomeElement = document.querySelector('.animated-welcome');
    const buttonElement = document.querySelector('.animated-button');


    if (titleElement) {
      const titleAnimation = createAnimation()
        .addElement(titleElement)
        .duration(1000)
        .keyframes([
          { offset: 0, transform: 'translateY(-20px)', opacity: '0' },
          { offset: 1, transform: 'translateY(0)', opacity: '1' },
        ]);
      titleAnimation.play();
    }

    if (welcomeElement) {
      const welcomeAnimation = createAnimation()
        .addElement(welcomeElement)
        .duration(800)
        .keyframes([
          { offset: 0, transform: 'scale(0.8)', opacity: '0' },
          { offset: 1, transform: 'scale(1)', opacity: '1' },
        ]);
      welcomeAnimation.play();
    }

    if (buttonElement) {
      const buttonAnimation = createAnimation()
        .addElement(buttonElement)
        .duration(800)
        .keyframes([
          { offset: 0, transform: 'translateX(-20px)', opacity: '0' },
          { offset: 1, transform: 'translateX(0)', opacity: '1' },
        ]);
      buttonAnimation.play();
    }
  }
}
