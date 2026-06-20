import { TipoDocSalida } from "../class/models/tipodocsalida";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TipoDocSalidaService {

  private baseUrl = environment.URL_BACKEND + '/tipodocsalidas';

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<TipoDocSalida[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(data => data.map(item => TipoDocSalida.fromJson(item)))
    );

  }

}