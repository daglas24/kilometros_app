import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service'; // Importa el servicio

@Component({
  selector: 'app-crud1',
  templateUrl: 'crud1.page.html',
  styleUrls: ['crud1.page.scss'],
})
export class Crud1Page implements OnInit {
  // Arreglo para almacenar los productos
  productos: Array<any> = [];

  // Objeto para almacenar los valores del formulario
  producto = {
    nombre: '',
    precio: 0,
    cantidad: 0,
    litros: 0,
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productos = this.productoService.getProductos(); // Cargar productos desde el servicio
  }

  // Función para agregar un nuevo producto
  agregarProducto() {
    if (this.producto.nombre && this.producto.precio && this.producto.cantidad && this.producto.litros) {
      this.productoService.agregarProducto(this.producto); // Guardar el producto
      this.productos = this.productoService.getProductos(); // Recargar productos
      this.producto = { nombre: '', precio: 0, cantidad: 0, litros: 0 }; // Limpiar el formulario
    } else {
      alert('Por favor complete todos los campos.');
    }
  }

  // Función para editar un producto
  editarProducto(index: number) {
    const producto = this.productos[index];
    this.producto = { ...producto };  // Copiar el producto al formulario
    this.eliminarProducto(index); // Eliminar el producto actual para poder editarlo
  }

  // Función para eliminar un producto
  eliminarProducto(index: number) {
    this.productoService.eliminarProducto(index); // Eliminar el producto del servicio
    this.productos = this.productoService.getProductos(); // Recargar productos
  }

  // Función para exportar los productos a un archivo JSON
  exportarProductos() {
    const productos = this.productoService.getProductos(); // Obtener productos
    const productosJson = JSON.stringify(productos, null, 2); // Convertir a formato JSON
    
    const blob = new Blob([productosJson], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'productos.json'; // Nombre del archivo a descargar
    link.click(); // Iniciar descarga
  }
}
