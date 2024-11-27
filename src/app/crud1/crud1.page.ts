import { Component } from '@angular/core';

@Component({
  selector: 'app-crud1',
  templateUrl: 'crud1.page.html',
  styleUrls: ['crud1.page.scss'],
})
export class Crud1Page {
  
  productos: Array<any> = [];

  
  producto = {
    nombre: '',
    precio: 0,
    cantidad: 0,
    litros: 0
  };

  constructor() {}

  agregarProducto() {
    if (this.producto.nombre && this.producto.precio && this.producto.cantidad && this.producto.litros) {
      this.productos.push({...this.producto});
      this.producto = { nombre: '', precio: 0, cantidad: 0, litros: 0 };
    } else {
      alert('Por favor complete todos los campos.');
    }
  }

 
  editarProducto(index: number) {
    const producto = this.productos[index];
    this.producto = { ...producto };
    this.eliminarProducto(index);
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }
}
