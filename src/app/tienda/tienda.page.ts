import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { CarritoService, Product } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  username: string | null = '';
  isDarkMode: boolean = false; // Estado inicial del tema

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    private navCtrl: NavController,
    private renderer: Renderer2 // Para modificar la clase del body
  ) { 
    this.username = this.authService.getUsername();
    this.isDarkMode = localStorage.getItem('theme') === 'dark'; // Leer el estado guardado
    this.applyTheme(); // Aplicar el tema al cargar la página
  }

  ngOnInit() {}

  addToCart(name: string, price: number, image: string) {
    const product: Product = { name, price, image, quantity: 1 };
    this.carritoService.addProduct(product);
    this.navCtrl.navigateForward('/carrito');
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light'); // Guardar el estado
    this.applyTheme(); // Aplicar el tema seleccionado
  }

  applyTheme() {
    const theme = this.isDarkMode ? 'dark' : 'light';
    this.renderer.setAttribute(document.body, 'class', theme); // Cambiar la clase del body
  }
}
