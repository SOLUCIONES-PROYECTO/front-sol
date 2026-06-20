import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DetalleSalida } from '../class/models/detallesalida';

@Injectable({
  providedIn: 'root'
})
export class DetalleSalidaService {

  private baseUrl =environment.URL_BACKEND + '/detallesalidas';


  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<DetalleSalida[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(

      map(data =>
        data.map(item =>
          DetalleSalida.fromJson(item)
        )
      )

    );

  }

  buscar(id: number): Observable<DetalleSalida> {

    return this.http.get<unknown>(
      `${this.baseUrl}/${id}`
    ).pipe(

      map(data =>
        DetalleSalida.fromJson(data)
      )

    );

  }

  crear(
    detalleEntrada: DetalleSalida
  ): Observable<DetalleSalida> {

    return this.http.post<unknown>(
      this.baseUrl,
      DetalleSalida.toJson(detalleEntrada)
    ).pipe(

      map(data =>
        DetalleSalida.fromJson(data)
      )

    );

  }

  actualizar(
    id: number,
    detalleEntrada: DetalleSalida
  ): Observable<DetalleSalida> {

    return this.http.put<unknown>(
      `${this.baseUrl}/${id}`,
      DetalleSalida.toJson(detalleEntrada)
    ).pipe(

      map(data =>
        DetalleSalida.fromJson(data)
      )

    );

  }

  eliminar(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );

  }

}