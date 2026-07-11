import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ChartConfiguration, ChartData } from 'chart.js';
import {Router} from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

import { DashboardService } from '../../core/services/dashboard/dashboard.service';
import { ResumenDashboard } from '../../core/class/models/dashboard/resumendashboard';
import { VentaMes } from '../../core/class/models/dashboard/ventames';
import { GananciaMes } from '../../core/class/models/dashboard/gananciames';
import { ProductoMasVendido } from '../../core/class/models/dashboard/productomasvendido';
import { ProductoSinMovimiento } from '../../core/class/models/dashboard/productosinmovimiento';
import { TendenciaProducto } from '../../core/class/models/dashboard/tendenciaproducto';
import { ProductoStockBajo } from '../../core/class/models/dashboard/productostockbajo';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  resumen: ResumenDashboard = new ResumenDashboard();
  ventasPorMes: VentaMes[] = [];
  gananciaPorMes: GananciaMes[] = [];
  topProductos: ProductoMasVendido[] = [];
  productosNoComprar: ProductoSinMovimiento[] = [];
  tendenciasProductos: TendenciaProducto[] = [];
  productosStockBajo: ProductoStockBajo[] = [];

  cargando = true;

  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDashboard();
    const cargo = this.authService.getCargo();
    this.redirigirSegunCargo(cargo);
  }

  private redirigirSegunCargo(cargo: string | null): void {
    switch (cargo) {
      case 'Administrador':
        this.router.navigate(['/dashboard/admin']);
        break;
      case 'Jefe de Compras':
        this.router.navigate(['/dashboard/jefe-compras']);
        break;
      case 'Almacenero':
        this.router.navigate(['/dashboard/almacenero']);
        break;
      case 'Vendedor':
        this.router.navigate(['/dashboard/vendedor']);
        break;
      default:
        this.router.navigate(['/dashboard/admin']); // fallback seguro
        break;
    }
  }

  cargarDashboard(): void {

    forkJoin({
      resumen: this.dashboardService.obtenerResumen(),
  ventas: this.dashboardService.ventasPorMes(6),
  ganancias: this.dashboardService.gananciaPorMes(6),
  topProductos: this.dashboardService.productosMasVendidos(5, 90),
  noComprar: this.dashboardService.noComprar(45),         
  tendencias: this.dashboardService.tendencias(),       
  stockBajo: this.dashboardService.stockBajo()      
    }).subscribe({
      next: (data) => {
        this.resumen = data.resumen;
        this.ventasPorMes = data.ventas;
        this.gananciaPorMes = data.ganancias;
        this.topProductos = data.topProductos;
        this.topProductos = data.topProductos;
    this.productosNoComprar = data.noComprar;             
    this.tendenciasProductos = data.tendencias;          
    this.productosStockBajo = data.stockBajo;            

        this.construirGraficoLineas();
        this.construirGraficoBarras();

        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar el dashboard', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  private construirGraficoLineas(): void {
    this.lineChartData = {
      labels: this.gananciaPorMes.map(g => g.mes),
      datasets: [
        {
          label: 'Ingresos',
          data: this.gananciaPorMes.map(g => g.ingresos),
          borderColor: '#A32924',
          backgroundColor: 'rgba(163, 41, 36, 0.1)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Ganancia',
          data: this.gananciaPorMes.map(g => g.ganancia),
          borderColor: '#531E1E',
          backgroundColor: 'rgba(83, 30, 30, 0.1)',
          tension: 0.3,
          fill: true
        }
      ]
    };
  }

  private construirGraficoBarras(): void {
    this.barChartData = {
      labels: this.topProductos.map(p => p.nombreProducto),
      datasets: [
        {
          label: 'Unidades vendidas',
          data: this.topProductos.map(p => p.cantidadVendida),
          backgroundColor: '#A32924',
          borderRadius: 6
        }
      ]
    };
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(valor);
  }
}