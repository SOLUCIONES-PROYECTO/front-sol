import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { EstadoOrdenCompra } from '../class/models/estadoordencompra';

@Injectable({
  providedIn: 'root'
})
export class EstadoOrdenCompraService {

  private baseUrl = environment.URL_BACKEND + '/estadoordencompras';

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<EstadoOrdenCompra[]> {
    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(data =>
        data.map(item =>
          EstadoOrdenCompra.fromJson(item)
        )
      )
    );
  }

  buscar(id: number): Observable<EstadoOrdenCompra> {
    return this.http.get<unknown>(
      `${this.baseUrl}/${id}`
    ).pipe(
      map(data =>
        EstadoOrdenCompra.fromJson(data)
      )
    );
  }

  crear(
    estado: EstadoOrdenCompra
  ): Observable<EstadoOrdenCompra> {
    return this.http.post<unknown>(
      this.baseUrl,
      EstadoOrdenCompra.toJson(estado)
    ).pipe(
      map(data =>
        EstadoOrdenCompra.fromJson(data)
      )
    );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );
  }
}