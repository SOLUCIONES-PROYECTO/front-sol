import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DocSalida } from '../class/models/docsalida';

@Injectable({
  providedIn: 'root'
})
export class EgresosService {

  private baseUrl = environment.URL_BACKEND + '/docsalida';

  constructor(private http: HttpClient) {}

  listarEgresos(): Observable<DocSalida[]> {
    return this.http.get<DocSalida[]>(this.baseUrl);
  }

  crearEgreso(docSalida: DocSalida): Observable<DocSalida> {
    return this.http.post<DocSalida>(
      this.baseUrl,
      docSalida
    );
  }

}