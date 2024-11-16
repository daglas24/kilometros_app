import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { CarritoService, Product } from 'src/app/services/carrito.service'; // Importamos el tipo Product


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  username: string | null = '';

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    private navCtrl: NavController
  ) { 
    this.username = this.authService.getUsername();
  }

  ngOnInit() {}

  addToCart(name: string, price: number, image: string) {
    // Añadimos el producto al carrito
    const product: Product = { name, price, image, quantity: 1 }; // Definimos el tipo Product
    this.carritoService.addProduct(product);
    // Navegamos al carrito después de añadir el producto
    this.navCtrl.navigateForward('/carrito');
  }
}
