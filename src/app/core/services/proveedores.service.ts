import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Proveedor } from '../class/models/proveedores';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private baseUrl = environment.URL_BACKEND + '/proveedores';

  constructor(private http: HttpClient) {}

  listarProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.baseUrl);
  }

  crearProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(
      this.baseUrl,
      proveedor
    );
  }

}