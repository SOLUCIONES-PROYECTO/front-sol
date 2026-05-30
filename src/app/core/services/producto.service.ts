import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Observable } from 'rxjs';
import { Producto } from '../class/models/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = environment.URL_BACKEND + '/productos';

  constructor(private http: HttpClient) {}

  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.baseUrl, producto);
  }
}