import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-crud1',
  templateUrl: 'crud1.page.html',
  styleUrls: ['crud1.page.scss'],
})
export class Crud1Page implements OnInit {
  productos: Array<any> = [];
  producto = {
    nombre: '',
    precio: 0,
    cantidad: 0,
    litros: 0,
  };

  constructor(private productoService: ProductoService) {}

  async ngOnInit() {
    this.productos = await this.productoService.getProductos();
  }

  agregarProducto() {
    if (this.validarProducto()) {
      this.productos.push({ ...this.producto });
      this.guardarProductos();
      this.limpiarFormulario();
    } else {
      alert('Por favor complete todos los campos.');
    }
  }

  editarProducto(index: number) {
    this.producto = { ...this.productos[index] };
    this.productos.splice(index, 1); // Eliminamos el producto para editarlo
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
    this.guardarProductos();
  }

  guardarProductos() {
    this.productoService.saveProductos(this.productos);
  }

  exportarProductos() {
    const productosJson = JSON.stringify(this.productos, null, 2);
    const blob = new Blob([productosJson], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'productos.json';
    link.click();
  }

  private validarProducto(): boolean {
    return (
      !!this.producto.nombre &&
      this.producto.precio > 0 &&
      this.producto.cantidad > 0 &&
      this.producto.litros > 0
    );
  }

  private limpiarFormulario() {
    this.producto = { nombre: '', precio: 0, cantidad: 0, litros: 0 };
  }
}
