import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private storageKey = 'productos'; // Clave para localStorage

  constructor() {}

  // Obtener los productos desde localStorage (si existen)
  getProductos() {
    const productos = localStorage.getItem(this.storageKey);
    return productos ? JSON.parse(productos) : [];
  }

  // Guardar productos en localStorage
  saveProductos(productos: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(productos));
  }

  // Agregar un producto a la lista
  agregarProducto(producto: any) {
    const productos = this.getProductos();
    productos.push(producto);
    this.saveProductos(productos);
  }

  // Editar un producto
  editarProducto(index: number, producto: any) {
    const productos = this.getProductos();
    productos[index] = producto;
    this.saveProductos(productos);
  }

  // Eliminar un producto
  eliminarProducto(index: number) {
    const productos = this.getProductos();
    productos.splice(index, 1);
    this.saveProductos(productos);
  }
}
