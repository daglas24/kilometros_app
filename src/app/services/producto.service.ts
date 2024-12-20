import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private storageKey = 'producto';
  private apiUrl = 'https://api.jsonbin.io/v3/b/6747e1f1e41b4d34e45bfe06';
  private apiKey = '6747e1f1e41b4d34e45bfe06'; 

  constructor(private http: HttpClient) {}

  getProductosLocal(): any[] {
    const productos = localStorage.getItem(this.storageKey);
    return productos ? JSON.parse(productos) : [];
  }

  saveProductosLocal(productos: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(productos));
  }

  getProductosRemoto(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: {
        'X-Master-Key': this.apiKey,
      },
    });
  }

  saveProductosRemoto(productos: any[]): Observable<any> {
    return this.http.put(
      this.apiUrl,
      { record: productos },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': this.apiKey,
        },
      }
    );
  }

  async getProductos(): Promise<any[]> {
    try {
      const response: any = await this.getProductosRemoto().toPromise();
      return response.record || [];
    } catch (error) {
      console.error('Error al obtener productos remotos:', error);
      return this.getProductosLocal();
    }
  }

  saveProductos(productos: any[]): void {
    this.saveProductosLocal(productos);
    this.saveProductosRemoto(productos).subscribe({
      next: () => console.log('Productos guardados en JSONBin'),
      error: (err) => console.error('Error al guardar en JSONBin', err),
    });
  }
}
