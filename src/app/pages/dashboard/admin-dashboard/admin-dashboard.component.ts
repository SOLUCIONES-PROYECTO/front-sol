import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ChartConfiguration, ChartData } from 'chart.js';

import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { ResumenDashboard } from '../../../core/class/models/dashboard/resumendashboard';
import { GananciaMes } from '../../../core/class/models/dashboard/gananciames';
import { ProductoMasVendido } from '../../../core/class/models/dashboard/productomasvendido';
import { ProductoSinMovimiento } from '../../../core/class/models/dashboard/productosinmovimiento';
import { TendenciaProducto } from '../../../core/class/models/dashboard/tendenciaproducto';
import { ProductoStockBajo } from '../../../core/class/models/dashboard/productostockbajo';
import { ProductoVencimiento } from '../../../core/class/models/dashboard/productovencimiento';
import { ValorEnRiesgo } from '../../../core/class/models/dashboard/valorenriesgo';

@Component({
  selector: 'app-admin-dashboard.component',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {

  resumen: ResumenDashboard = new ResumenDashboard();
  gananciaPorMes: GananciaMes[] = [];
  topProductos: ProductoMasVendido[] = [];
  productosNoComprar: ProductoSinMovimiento[] = [];
  tendenciasProductos: TendenciaProducto[] = [];
  productosStockBajo: ProductoStockBajo[] = [];
  vencimientos: ProductoVencimiento[] = [];
  valorEnRiesgo: ValorEnRiesgo = new ValorEnRiesgo();

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
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard(): void {

    forkJoin({
      resumen: this.dashboardService.obtenerResumen(),
      ganancias: this.dashboardService.gananciaPorMes(6),
      topProductos: this.dashboardService.productosMasVendidos(5, 90),
      noComprar: this.dashboardService.noComprar(45),
      tendencias: this.dashboardService.tendencias(),
      stockBajo: this.dashboardService.stockBajo(),
      vencimientos: this.dashboardService.vencimientos(),
      valorEnRiesgo: this.dashboardService.valorEnRiesgo()
    }).subscribe({
      next: (data) => {
        this.resumen = data.resumen;
        this.gananciaPorMes = data.ganancias;
        this.topProductos = data.topProductos;
        this.productosNoComprar = data.noComprar;
        this.tendenciasProductos = data.tendencias;
        this.productosStockBajo = data.stockBajo;
        this.vencimientos = data.vencimientos;
        this.valorEnRiesgo = data.valorEnRiesgo;

        this.construirGraficoLineas();
        this.construirGraficoBarras();

        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar el admin-dashboard', err);
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

  getUrgenciaBadgeClass(urgencia: string): string {
    switch (urgencia) {
      case 'VENCIDO':
        return 'bg-badge-vencido-bg text-badge-vencido-text';
      case 'URGENTE':
        return 'bg-badge-devuelto-bg text-badge-devuelto-text';
      case 'PROXIMO':
        return 'bg-badge-tarjeta-bg text-badge-tarjeta-text';
      case 'ADVERTENCIA':
        return 'bg-badge-observado-bg text-badge-observado-text';
      default:
        return 'bg-badge-noaplica-bg text-badge-noaplica-text';
    }
  }

  getUrgenciaLabel(urgencia: string): string {
    switch (urgencia) {
      case 'VENCIDO': return 'Vencido';
      case 'URGENTE': return 'Urgente (≤7 días)';
      case 'PROXIMO': return 'Próximo (≤15 días)';
      case 'ADVERTENCIA': return 'Advertencia (≤30 días)';
      default: return urgencia;
    }
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(valor);
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}