import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Cliente } from '../class/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl =
    environment.URL_BACKEND + '/clientes';

  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<Cliente[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(

      map(data =>
        data.map(item =>
          Cliente.fromJson(item)
        )
      )

    );

  }

  buscar(id: number): Observable<Cliente> {

    return this.http.get<unknown>(
      `${this.baseUrl}/${id}`
    ).pipe(

      map(data =>
        Cliente.fromJson(data)
      )

    );

  }

  crear(
    cliente: Cliente
  ): Observable<Cliente> {

    return this.http.post<unknown>(
      this.baseUrl,
      Cliente.toJson(cliente)
    ).pipe(

      map(data =>
        Cliente.fromJson(data)
      )

    );

  }

  actualizar(
    id: number,
    cliente: Cliente
  ): Observable<Cliente> {

    return this.http.put<unknown>(
      `${this.baseUrl}/${id}`,
      Cliente.toJson(cliente)
    ).pipe(

      map(data =>
        Cliente.fromJson(data)
      )

    );

  }

  eliminar(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );

  }

}