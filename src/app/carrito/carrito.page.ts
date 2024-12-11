import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Product } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  cart: Product[] = [];
  total = 0;
  showPaymentForm = false;
  paymentSuccess = false;

  paymentDetails = {
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  };

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cart = this.carritoService.getCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.carritoService.getTotal();
  }

  increaseQuantity(product: Product) {
    this.carritoService.increaseQuantity(product);
    this.loadCart();
  }

  decreaseQuantity(product: Product) {
    this.carritoService.decreaseQuantity(product);
    this.loadCart();
  }

  removeProduct(product: Product) {
    this.carritoService.removeProduct(product);
    this.loadCart();
  }

  openPaymentForm() {
    this.showPaymentForm = true;
  }

  closePaymentForm() {
    this.showPaymentForm = false;
    this.resetPaymentDetails();
  }

  resetPaymentDetails() {
    this.paymentDetails = {
      name: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    };
  }

  validateCardNumber(event: any) {
    const input = event.target.value;
    this.paymentDetails.cardNumber = input.replace(/[^0-9]/g, '').slice(0, 16);
  }

  validateExpiryDate(event: any) {
    const input = event.target.value;
    const sanitizedInput = input.replace(/[^0-9/]/g, '').slice(0, 5);
    const formattedInput = sanitizedInput
      .replace(/^(\d{2})(\d{1,2})?$/, '$1/$2')
      .slice(0, 5);
    this.paymentDetails.expiryDate = formattedInput;
  }

  validateCVV(event: any) {
    const input = event.target.value;
    this.paymentDetails.cvv = input.replace(/[^0-9]/g, '').slice(0, 3);
  }

  processPayment() {
    if (
      this.paymentDetails.name &&
      this.paymentDetails.cardNumber.length === 16 &&
      this.paymentDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/) &&
      this.paymentDetails.cvv.length === 3
    ) {
      this.paymentSuccess = true;
      this.showPaymentForm = false;
      this.carritoService.clearCart();
      this.loadCart();
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  closePaymentSuccess() {
    this.paymentSuccess = false;
  }
}
