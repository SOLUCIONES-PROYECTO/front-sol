import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AreaUsoInterno } from '../class/models/areusointerno';

@Injectable({
  providedIn: 'root'
})
export class AreaUsoInternoService {

  private baseUrl =environment.URL_BACKEND + '/areausointernos';


  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<AreaUsoInterno[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(

      map(data =>
        data.map(item =>
          AreaUsoInterno.fromJson(item)
        )
      )

    );

  }

  buscar(id: number): Observable<AreaUsoInterno> {

    return this.http.get<unknown>(
      `${this.baseUrl}/${id}`
    ).pipe(

      map(data =>
        AreaUsoInterno.fromJson(data)
      )

    );

  }

  crear(
    detalleEntrada: AreaUsoInterno
  ): Observable<AreaUsoInterno> {

    return this.http.post<unknown>(
      this.baseUrl,
      AreaUsoInterno.toJson(detalleEntrada)
    ).pipe(

      map(data =>
        AreaUsoInterno.fromJson(data)
      )

    );

  }

  actualizar(
    id: number,
    detalleEntrada: AreaUsoInterno
  ): Observable<AreaUsoInterno> {

    return this.http.put<unknown>(
      `${this.baseUrl}/${id}`,
      AreaUsoInterno.toJson(detalleEntrada)
    ).pipe(

      map(data =>
        AreaUsoInterno.fromJson(data)
      )

    );

  }

  eliminar(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );

  }

}