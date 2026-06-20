import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Producto } from '../class/models/productos';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = environment.URL_BACKEND + '/productos';

  constructor(private http: HttpClient) {}

  listarProductos(): Observable<Producto[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(response =>
        response.map(item => Producto.fromJson(item))
      )
    );

  }

  obtenerProducto(id: number): Observable<Producto> {

    return this.http.get<unknown>(
      `${this.baseUrl}/${id}`
    ).pipe(
      map(response => Producto.fromJson(response))
    );

  }

  crearProducto(
    producto: Producto
  ): Observable<Producto> {

    return this.http.post<unknown>(
      this.baseUrl,
      Producto.toJson(producto)
    ).pipe(
      map(response => Producto.fromJson(response))
    );

  }

  actualizarProducto(
    id: number,
    producto: Producto
  ): Observable<Producto> {

    return this.http.put<unknown>(
      `${this.baseUrl}/${id}`,
      Producto.toJson(producto)
    ).pipe(
      map(response => Producto.fromJson(response))
    );

  }

  eliminarProducto(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );

  }
}