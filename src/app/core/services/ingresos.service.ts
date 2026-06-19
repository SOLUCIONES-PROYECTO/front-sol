import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DocEntrada } from '../class/models/docentrada';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  private baseUrl = environment.URL_BACKEND + '/docentrada';

  constructor(private http: HttpClient) {}

  listarIngresos(): Observable<DocEntrada[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(response =>
        response.map(item => DocEntrada.fromJson(item))
      )
    );

  }

  obtenerIngreso(id: number): Observable<DocEntrada> {

    return this.http.get<unknown>(
      `${this.baseUrl}/${id}`
    ).pipe(
      map(response => DocEntrada.fromJson(response))
    );

  }

  crearIngreso(
    docEntrada: DocEntrada
  ): Observable<DocEntrada> {

    return this.http.post<unknown>(
      this.baseUrl,
      DocEntrada.toJson(docEntrada)
    ).pipe(
      map(response => DocEntrada.fromJson(response))
    );

  }

  actualizarIngreso(
    id: number,
    docEntrada: DocEntrada
  ): Observable<DocEntrada> {

    return this.http.put<unknown>(
      `${this.baseUrl}/${id}`,
      DocEntrada.toJson(docEntrada)
    ).pipe(
      map(response => DocEntrada.fromJson(response))
    );

  }

  eliminarIngreso(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );

  }

}