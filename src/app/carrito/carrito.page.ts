import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Product } from 'src/app/services/carrito.service'; // Importamos el tipo Product

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  cart: Product[] = []; // Especificamos que cart es un array de Product
  total = 0;
  showSuccessMessage = false;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    // Actualiza el carrito y el total
    this.cart = this.carritoService.getCart();
    this.calculateTotal();
  }

  calculateTotal() {
    // Calcula el total llamando al servicio
    this.total = this.carritoService.getTotal();
  }

  increaseQuantity(product: Product) {
    this.carritoService.increaseQuantity(product);
    this.loadCart(); // Actualiza el carrito y el total después de aumentar la cantidad
  }

  decreaseQuantity(product: Product) {
    this.carritoService.decreaseQuantity(product);
    this.loadCart(); // Actualiza el carrito y el total después de disminuir la cantidad
  }

  removeProduct(product: Product) {
    this.carritoService.removeProduct(product);
    this.loadCart(); // Actualiza el carrito y el total después de eliminar el producto
  }

  pay() {
    this.showSuccessMessage = true;
    this.carritoService.clearCart();
    this.loadCart();
  }

  resetSuccessMessage() {
    this.showSuccessMessage = false;
  }
}
