import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Proveedor } from '../class/models/proveedores';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private baseUrl = environment.URL_BACKEND + '/proveedores';

  constructor(private http: HttpClient) { }

  listarProveedor(): Observable<Proveedor[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(response =>
        response.map(item => Proveedor.fromJson(item))
      )
    );

  }

  crearProveedor(
    proveedor: Proveedor
  ): Observable<Proveedor> {

    return this.http.post<unknown>(
      this.baseUrl,
      Proveedor.toJson(proveedor)
    ).pipe(
      map(response => Proveedor.fromJson(response))
    );

  }

  eliminarProveedor(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );

  }

  obtenerProveedor(id: number): Observable<Proveedor> {

    return this.http.get<unknown>(
      `${this.baseUrl}/${id}`
    ).pipe(
      map(response => Proveedor.fromJson(response))
    );

  }

  actualizarProveedor(
    id: number,
    proveedor: Proveedor
  ): Observable<Proveedor> {

    return this.http.put<unknown>(
      `${this.baseUrl}/${id}`,
      Proveedor.toJson(proveedor)
    ).pipe(
      map(response => Proveedor.fromJson(response))
    );

  }
}