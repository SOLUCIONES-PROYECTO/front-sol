import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DocEntrada } from '../class/models/docentrada';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  private baseUrl = environment.URL_BACKEND + '/docentrada';

  constructor(private http: HttpClient) {}

  listarIngresos(): Observable<DocEntrada[]> {
    return this.http.get<DocEntrada[]>(this.baseUrl);
  }

  crearIngreso(docEntrada: DocEntrada): Observable<DocEntrada> {
    return this.http.post<DocEntrada>(
      this.baseUrl,
      docEntrada
    );
  }

}