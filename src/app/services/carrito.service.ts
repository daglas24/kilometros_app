import { Injectable } from '@angular/core';

export interface Product {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private cart: Product[] = [];

  getCart(): Product[] {
    return this.cart;
  }

  addProduct(product: Product): void {
    const existingProduct = this.cart.find(item => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  increaseQuantity(product: Product): void {
    const existingProduct = this.cart.find(item => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }
  }

  decreaseQuantity(product: Product): void {
    const existingProduct = this.cart.find(item => item.name === product.name);
    if (existingProduct && existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
    } else if (existingProduct) {
      this.removeProduct(product); // Elimina el producto si la cantidad es 1
    }
  }

  removeProduct(product: Product): void {
    this.cart = this.cart.filter(item => item.name !== product.name);
  }

  getTotal(): number {
    return this.cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  clearCart(): void {
    this.cart = [];
  }
}
