import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private storageKey = 'producto';
  private apiUrl = 'https://api.jsonbin.io/v3/b/6747e1f1e41b4d34e45bfe06';
  private apiKey = '';

  constructor(private http: HttpClient) {}

  getProductosLocal(): any[] {
    const productos = localStorage.getItem(this.storageKey);
    return productos ? JSON.parse(productos) : [];
  }

  // Guardar productos en localStorage
  saveProductosLocal(productos: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(productos));
  }

  // Obtener productos desde JSONBin
  getProductosRemoto(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Guardar productos en JSONBin
  saveProductosRemoto(productos: any[]): Observable<any> {
    return this.http.put(
      this.apiUrl,
      { record: productos }, // JSONBin espera los datos bajo la clave "record"
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // Obtener productos (local o remoto según preferencia)
  getProductos(): Promise<any[]> {
    return this.getProductosRemoto()
      .toPromise()
      .then((response: any) => response.record || [])
      .catch((error) => {
        console.error('Error al obtener productos remotos:', error);
        return this.getProductosLocal(); // Fallback al almacenamiento local
      });
  }

  // Guardar productos (local y remoto)
  saveProductos(productos: any[]): void {
    this.saveProductosLocal(productos); // Guardar local
    this.saveProductosRemoto(productos).subscribe({
      next: () => console.log('Productos guardados en JSONBin'),
      error: (err) => console.error('Error al guardar en JSONBin', err),
    });
  }
}
