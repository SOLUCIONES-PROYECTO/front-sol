import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { OrdenCompra } from '../class/models/ordencompra';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {

  private baseUrl = environment.URL_BACKEND + '/ordenescompra';

  constructor(private http: HttpClient) {}

  // ================= LISTAR =================
  listar(): Observable<OrdenCompra[]> {
    return this.http.get<unknown[]>(this.baseUrl).pipe(
      map(data => data.map(item => OrdenCompra.fromJson(item)))
    );
  }

  // ================= BUSCAR =================
  buscar(id: number): Observable<OrdenCompra> {
    return this.http.get<unknown>(`${this.baseUrl}/${id}`).pipe(
      map(data => OrdenCompra.fromJson(data))
    );
  }

  // ================= LISTAR POR EMPLEADO =================
  listarPorEmpleado(idEmpleado: number): Observable<OrdenCompra[]> {
    return this.http.get<unknown[]>(`${this.baseUrl}/empleado/${idEmpleado}`).pipe(
      map(data => data.map(item => OrdenCompra.fromJson(item)))
    );
  }

  // ================= LISTAR POR PROVEEDOR =================
  listarPorProveedor(idProveedor: number): Observable<OrdenCompra[]> {
    return this.http.get<unknown[]>(`${this.baseUrl}/proveedor/${idProveedor}`).pipe(
      map(data => data.map(item => OrdenCompra.fromJson(item)))
    );
  }

  // ================= LISTAR POR ESTADO =================
  listarPorEstado(idEstado: number): Observable<OrdenCompra[]> {
    return this.http.get<unknown[]>(`${this.baseUrl}/estado/${idEstado}`).pipe(
      map(data => data.map(item => OrdenCompra.fromJson(item)))
    );
  }

  // ================= CREAR =================
  crear(orden: OrdenCompra): Observable<OrdenCompra> {
    return this.http.post<unknown>(
      this.baseUrl,
      OrdenCompra.toJson(orden)
    ).pipe(
      map(data => OrdenCompra.fromJson(data))
    );
  }

  // ================= CAMBIAR ESTADO =================
  cambiarEstado(id: number, idNuevoEstado: number): Observable<OrdenCompra> {
    return this.http.patch<unknown>(
      `${this.baseUrl}/${id}/estado/${idNuevoEstado}`,
      {}
    ).pipe(
      map(data => OrdenCompra.fromJson(data))
    );
  }

  // ================= ANULAR =================
  anular(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/anular`);
  }

  // ================= ACTUALIZAR =================
actualizar(
  id: number,
  orden: OrdenCompra
): Observable<OrdenCompra> {

  return this.http.put<unknown>(
    `${this.baseUrl}/${id}`,
    OrdenCompra.toJson(orden)
  ).pipe(
    map(data => OrdenCompra.fromJson(data))
  );

}
}