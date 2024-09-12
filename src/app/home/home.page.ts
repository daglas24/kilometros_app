import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {} // Inyecta Router

  onSubmit(form: NgForm) { // Especifica el tipo NgForm
    if (form.valid) {
      // Procesar datos si el formulario es válido
      console.log('Formulario válido', form.value);
      
      // Redirige a la página combustible
      this.router.navigate(['/combustible']);
    } else {
      console.log('Formulario no válido');
    }
  }
}

