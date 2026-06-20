import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { UnidadMedida } from '../class/models/unidadmedida';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {

  private baseUrl = environment.URL_BACKEND + '/unidadmedidas';

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<UnidadMedida[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(data =>
        data.map(item =>
          UnidadMedida.fromJson(item)
        )
      )
    );

  }
}