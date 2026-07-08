import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {

  private baseUrl = environment.URL_BACKEND + '/categoriaproductos';

  constructor(private http: HttpClient) {}

  listar(): Observable<{ idCategoria: number; nombre: string; descripcion: string }[]> {
    return this.http.get<{ idCategoria: number; nombre: string; descripcion: string }[]>(this.baseUrl);
  }
}
