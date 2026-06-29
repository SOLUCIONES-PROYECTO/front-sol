import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { ResumenDashboard } from '../../class/models/dashboard/resumendashboard';
import { VentaMes } from '../../class/models/dashboard/ventames';
import { GananciaMes } from '../../class/models/dashboard/gananciames';
import { ProductoMasVendido } from '../../class/models/dashboard/productomasvendido';
import { ProductoSinMovimiento } from '../../class/models/dashboard/productosinmovimiento';
import { TendenciaProducto } from '../../class/models/dashboard/tendenciaproducto';
import { ProductoStockBajo } from '../../class/models/dashboard/productostockbajo';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = environment.URL_BACKEND + '/dashboard';

  constructor(private http: HttpClient) { }

  obtenerResumen(): Observable<ResumenDashboard> {
    return this.http.get<unknown>(`${this.baseUrl}/resumen`).pipe(
      map(data => ResumenDashboard.fromJson(data))
    );
  }

  ventasPorMes(meses: number = 6): Observable<VentaMes[]> {
    return this.http.get<unknown[]>(`${this.baseUrl}/ventas-por-mes?meses=${meses}`).pipe(
      map(data => data.map(item => VentaMes.fromJson(item)))
    );
  }

  gananciaPorMes(meses: number = 6): Observable<GananciaMes[]> {
    return this.http.get<unknown[]>(`${this.baseUrl}/ganancia-por-mes?meses=${meses}`).pipe(
      map(data => data.map(item => GananciaMes.fromJson(item)))
    );
  }

  productosMasVendidos(top: number = 5, dias: number = 90): Observable<ProductoMasVendido[]> {
    return this.http.get<unknown[]>(`${this.baseUrl}/productos-mas-vendidos?top=${top}&dias=${dias}`).pipe(
      map(data => data.map(item => ProductoMasVendido.fromJson(item)))
    );
  }

  noComprar(dias: number = 45): Observable<ProductoSinMovimiento[]> {
    return this.http.get<unknown[]>(`${this.baseUrl}/no-comprar?dias=${dias}`).pipe(
      map(data => data.map(item => ProductoSinMovimiento.fromJson(item)))
    );
  }

  tendencias(): Observable<TendenciaProducto[]> {
    return this.http.get<unknown[]>(`${this.baseUrl}/tendencias`).pipe(
      map(data => data.map(item => TendenciaProducto.fromJson(item)))
    );
  }

  stockBajo(): Observable<ProductoStockBajo[]> {
    return this.http.get<unknown[]>(`${this.baseUrl}/stock-bajo`).pipe(
      map(data => data.map(item => ProductoStockBajo.fromJson(item)))
    );
  }
}