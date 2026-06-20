import { EstadoPago } from "../class/models/estadopago";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class EstadoPagoService {

  private baseUrl = environment.URL_BACKEND + '/estadopagos';

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<EstadoPago[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(data => data.map(item => EstadoPago.fromJson(item)))
    );

  }

}