import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';

import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { ProductoStockBajo } from '../../../core/class/models/dashboard/productostockbajo';
import { ProductoVencimiento } from '../../../core/class/models/dashboard/productovencimiento';

import { DocEntradaService } from '../../../core/services/docEntrada.service';
import { DocEntrada } from '../../../core/class/models/docentrada';

@Component({
  selector: 'app-almacenero-dashboard.component',
  standalone: false,
  templateUrl: './almacenero-dashboard.component.html',
  styleUrl: './almacenero-dashboard.component.css',
})
export class AlmaceneroDashboardComponent implements OnInit {

  productosStockBajo: ProductoStockBajo[] = [];
  vencimientos: ProductoVencimiento[] = [];
  ultimosIngresos: DocEntrada[] = [];

  cargando = true;

  constructor(
    private dashboardService: DashboardService,
    private docEntradaService: DocEntradaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard(): void {

    forkJoin({
      stockBajo: this.dashboardService.stockBajo(),
      vencimientos: this.dashboardService.vencimientos(),
      ingresos: this.docEntradaService.listarIngresos()
    }).subscribe({
      next: (data) => {
        this.productosStockBajo = data.stockBajo;
        this.vencimientos = data.vencimientos;

        this.ultimosIngresos = [...data.ingresos]
          .sort((a, b) => new Date(b.fechaIngreso).getTime() - new Date(a.fechaIngreso).getTime())
          .slice(0, 5);

        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar el almacenero-dashboard', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
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

  formatearFecha(fecha: string): string {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(valor);
  }
}