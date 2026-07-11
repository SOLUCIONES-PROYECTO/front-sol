import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ChartConfiguration, ChartData } from 'chart.js';

import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { ProductoMasVendido } from '../../../core/class/models/dashboard/productomasvendido';
import { TendenciaProducto } from '../../../core/class/models/dashboard/tendenciaproducto';

import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/class/models/productos';

@Component({
  selector: 'app-vendedor-dashboard.component',
  standalone: false,
  templateUrl: './vendedor-dashboard.component.html',
  styleUrl: './vendedor-dashboard.component.css',
})
export class VendedorDashboardComponent implements OnInit {

  topProductos: ProductoMasVendido[] = [];
  tendenciasProductos: TendenciaProducto[] = [];
  productosDisponibles: Producto[] = [];

  cargando = true;

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
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard(): void {

    forkJoin({
      topProductos: this.dashboardService.productosMasVendidos(5, 90),
      tendencias: this.dashboardService.tendencias(),
      productos: this.productoService.listarProductos()
    }).subscribe({
      next: (data) => {
        this.topProductos = data.topProductos;
        this.tendenciasProductos = data.tendencias;

        this.productosDisponibles = data.productos
          .filter(p => p.stockActual > 0)
          .sort((a, b) => b.stockActual - a.stockActual);

        this.construirGraficoBarras();

        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar el vendedor-dashboard', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
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
}