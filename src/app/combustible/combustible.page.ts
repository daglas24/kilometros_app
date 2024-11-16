import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Importa el servicio

@Component({
  selector: 'app-combustible',
  templateUrl: './combustible.page.html',
  styleUrls: ['./combustible.page.scss'],
})
export class CombustiblePage implements OnInit {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.username = this.authService.getUsername() || 'Invitado'; // Obtén el nombre de usuario
  }

  goToInicio() {
    this.router.navigate(['/inicio']);
  }
}
