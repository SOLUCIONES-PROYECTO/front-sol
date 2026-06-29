import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DetalleSalida } from '../class/models/detallesalida';

@Injectable({ providedIn: 'root' })
export class DetalleSalidaService {

  private baseUrl = environment.URL_BACKEND + '/detallesalidas';

  constructor(private http: HttpClient) {}

  listar(): Observable<DetalleSalida[]> {
    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(data => data.map(item => DetalleSalida.fromJson(item)))
    );
  }

  crear(detalleSalida: DetalleSalida): Observable<DetalleSalida> {
    return this.http.post<unknown>(this.baseUrl, DetalleSalida.toJson(detalleSalida)).pipe(
      map(data => DetalleSalida.fromJson(data))
    );
  }
}