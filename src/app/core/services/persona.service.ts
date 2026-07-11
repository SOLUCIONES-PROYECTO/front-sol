import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Persona } from '../class/models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private baseUrl = environment.URL_BACKEND + '/persona';

  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<Persona[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(

      map(data =>
        data.map(item =>
          Persona.fromJson(item)
        )
      )

    );

  }

  buscar(id: number): Observable<Persona> {

    return this.http.get<unknown>(
      `${this.baseUrl}/${id}`
    ).pipe(

      map(data =>
        Persona.fromJson(data)
      )

    );

  }

  crear(
    persona: Persona
  ): Observable<Persona> {

    return this.http.post<unknown>(
      this.baseUrl,
      Persona.toJson(persona)
    ).pipe(

      map(data =>
        Persona.fromJson(data)
      )

    );

  }

  actualizar(
    id: number,
    persona: Persona
  ): Observable<Persona> {

    return this.http.put<unknown>(
      `${this.baseUrl}/${id}`,
      Persona.toJson(persona)
    ).pipe(

      map(data =>
        Persona.fromJson(data)
      )

    );

  }

  eliminar(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );

  }

}
