import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DetalleEntrada } from '../class/models/detalleentrada';

@Injectable({
  providedIn: 'root'
})
export class DetalleEntradaService {

  private baseUrl =environment.URL_BACKEND + '/detalle-entradas';


  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<DetalleEntrada[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(

      map(data =>
        data.map(item =>
          DetalleEntrada.fromJson(item)
        )
      )

    );

  }

  buscar(id: number): Observable<DetalleEntrada> {

    return this.http.get<unknown>(
      `${this.baseUrl}/${id}`
    ).pipe(

      map(data =>
        DetalleEntrada.fromJson(data)
      )

    );

  }

  crear(
    detalleEntrada: DetalleEntrada
  ): Observable<DetalleEntrada> {

    return this.http.post<unknown>(
      this.baseUrl,
      DetalleEntrada.toJson(detalleEntrada)
    ).pipe(

      map(data =>
        DetalleEntrada.fromJson(data)
      )

    );

  }

  actualizar(
    id: number,
    detalleEntrada: DetalleEntrada
  ): Observable<DetalleEntrada> {

    return this.http.put<unknown>(
      `${this.baseUrl}/${id}`,
      DetalleEntrada.toJson(detalleEntrada)
    ).pipe(

      map(data =>
        DetalleEntrada.fromJson(data)
      )

    );

  }

  eliminar(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );

  }

}