import { EstadoIngreso } from "../class/models/estadoingreso";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class EstadoIngresoService {

  private baseUrl = environment.URL_BACKEND + '/estadoingresos';

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<EstadoIngreso[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(data => data.map(item => EstadoIngreso.fromJson(item)))
    );

  }

}