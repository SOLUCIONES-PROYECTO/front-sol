import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Empleado } from '../class/models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseUrl =environment.URL_BACKEND + '/api/empleados';


  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<Empleado[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(

      map(data =>
        data.map(item =>
          Empleado.fromJson(item)
        )
      )

    );

  }

  buscar(id: number): Observable<Empleado> {

    return this.http.get<unknown>(
      `${this.baseUrl}/${id}`
    ).pipe(

      map(data =>
        Empleado.fromJson(data)
      )

    );

  }

  crear(
    empleado: Empleado
  ): Observable<Empleado> {

    return this.http.post<unknown>(
      this.baseUrl,
      Empleado.toJson(empleado)
    ).pipe(

      map(data =>
        Empleado.fromJson(data)
      )

    );

  }

  actualizar(
    id: number,
    empleado: Empleado
  ): Observable<Empleado> {

    return this.http.put<unknown>(
      `${this.baseUrl}/${id}`,
      Empleado.toJson(empleado)
    ).pipe(

      map(data =>
        Empleado.fromJson(data)
      )

    );

  }

  eliminar(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );

  }

}