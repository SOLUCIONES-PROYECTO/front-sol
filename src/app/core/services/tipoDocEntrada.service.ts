import { TipoDocEntrada } from "../class/models/tipodocentrada";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TipoDocEntradaService {

  private baseUrl = environment.URL_BACKEND + '/tipodocentradas';

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<TipoDocEntrada[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(data => data.map(item => TipoDocEntrada.fromJson(item)))
    );

  }

}