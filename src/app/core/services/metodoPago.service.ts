import { MetodoPago } from "../class/models/metodopago";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  private baseUrl = environment.URL_BACKEND + '/metodopagos';

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<MetodoPago[]> {

    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(data => data.map(item => MetodoPago.fromJson(item)))
    );

  }

}