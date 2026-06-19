import { EstadoProducto } from "../class/models/estadoproducto";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class EstadoProductoService {

  private baseUrl = environment.URL_BACKEND + '/estadoproductos';

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<EstadoProducto[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(data => data.map(item => EstadoProducto.fromJson(item)))
    );

  }

}