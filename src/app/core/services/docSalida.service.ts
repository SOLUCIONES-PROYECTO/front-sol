import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DocSalida } from '../class/models/docsalida';

@Injectable({ providedIn: 'root' })
export class DocSalidaService {

  private baseUrl = environment.URL_BACKEND + '/docsalida';

  constructor(private http: HttpClient) {}

  listarEgresos(): Observable<DocSalida[]> {
    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(response => response.map(item => DocSalida.fromJson(item)))
    );
  }

  obtener(id: number): Observable<DocSalida> {
    return this.http.get<unknown>(`${this.baseUrl}/${id}`).pipe(
      map(response => DocSalida.fromJson(response))
    );
  }

  crear(docSalida: DocSalida): Observable<DocSalida> {
    return this.http.post<unknown>(this.baseUrl, DocSalida.toJson(docSalida)).pipe(
      map(response => DocSalida.fromJson(response))
    );
  }

  actualizar(id: number, docSalida: DocSalida): Observable<DocSalida> {
    return this.http.put<unknown>(`${this.baseUrl}/${id}`, DocSalida.toJson(docSalida)).pipe(
      map(response => DocSalida.fromJson(response))
    );
  }

  eliminarEgreso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}