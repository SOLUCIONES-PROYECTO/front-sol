import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DetalleUsoInterno } from '../class/models/detalleusointerno';

@Injectable({ providedIn: 'root' })
export class DetalleUsoInternoService {

  private baseUrl = environment.URL_BACKEND + '/detalleusointernos';

  constructor(private http: HttpClient) {}

  // DetalleUsoInternoService
listar(): Observable<DetalleUsoInterno[]> {
  return this.http.get<unknown[]>(this.baseUrl).pipe(
    map(data => data.map(item => DetalleUsoInterno.fromJson(item)))
  );
}

  crear(detalleUsoInterno: DetalleUsoInterno): Observable<DetalleUsoInterno> {
    return this.http.post<unknown>(this.baseUrl, DetalleUsoInterno.toJson(detalleUsoInterno)).pipe(
      map(data => DetalleUsoInterno.fromJson(data))
    );
  }
}