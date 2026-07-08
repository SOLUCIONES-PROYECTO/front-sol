import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private baseUrl = environment.URL_BACKEND + '/cargos';

  constructor(private http: HttpClient) {}

  listar(): Observable<{ idCargo: number; nombre: string; }[]> {
    return this.http.get<{ idCargo: number; nombre: string; }[]>(this.baseUrl);
  }
}
