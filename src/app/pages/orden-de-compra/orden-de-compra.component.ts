import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { OrdenCompraService } from '../../core/services/ordenCompra.service';
import { OrdenCompra } from '../../core/class/models/ordencompra';
import { SidebarCounterService } from '../../shared/services/sidebar-counter.service';
@Component({
  selector: 'app-orden-de-compra',
  standalone: false,
  templateUrl: './orden-de-compra.component.html',
  styleUrl: './orden-de-compra.component.css',
})

export class OrdenDeCompraComponent implements OnInit {

  columns = [
    { key: 'numeroOrden', label: 'N° Orden' },
    { key: 'fechaEmision', label: 'Fecha emisión' },
    { key: 'fechaEntregaEsperada', label: 'Entrega esperada' },
    { key: 'proveedor', label: 'Proveedor' },
    { key: 'empleado', label: 'Solicitado por' },
    { key: 'estado', label: 'Estado', type: 'badge' },
    { key: 'total', label: 'Total' },
  ];

  filters = [
    {
      key: 'estado',
      label: 'Estado',
      options: [
        { value: 'Borrador', label: 'Borrador' },
        { value: 'Enviada', label: 'Enviada' },
        { value: 'Aprobada', label: 'Aprobada' },
        { value: 'Recibida', label: 'Recibida' },
        { value: 'Anulada', label: 'Anulada' },
      ]
    },
  ];

  data: any[] = [];
  dataOriginal: any[] = [];
  searchText = '';
  activeFilters: Record<string, string> = {};

  constructor(
    private ordenCompraService: OrdenCompraService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sidebarCounter: SidebarCounterService,
  ) { }

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    this.ordenCompraService.listar().subscribe({
      next: (ordenes: OrdenCompra[]) => {
        console.log('estadoOc:', ordenes[0].estadoOc);
        console.log('Orden completa:', JSON.stringify(ordenes[0], null, 2));
        this.data = ordenes.map(o => ({
          id: o.idordenCompra,
          numeroOrden: o.numeroOrden,
          fechaEmision: o.fechaEmision,
          fechaEntregaEsperada: o.fechaEntregaEsperada,
          proveedor: o.nombreProveedor,
          empleado: o.nombreEmpleado,
          estado: o.estadoOc,
          total: new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
          }).format(o.total),
        }));

        this.dataOriginal = [...this.data];

        this.sidebarCounter.ordenesCount.next(
          ordenes.length
        );

        this.cdr.detectChanges();
        console.log('DATA ORDENES:', this.data);
      },
      error: (err) => {
        console.error('Error al cargar órdenes de compra', err);
      }
    });
  }

  buscar(texto: string): void {
    this.searchText = texto.toLowerCase();
    this.aplicarFiltros();
  }

  filtrar(filter: { key: string; value: string }): void {
    this.activeFilters[filter.key] = filter.value;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.data = this.dataOriginal.filter(item => {
      const cumpleBusqueda =
        Object.values(item).join(' ').toLowerCase().includes(this.searchText);

      const cumpleFiltros =
        Object.entries(this.activeFilters).every(([key, value]) => {
          if (!value) return true;
          return item[key] === value;
        });

      return cumpleBusqueda && cumpleFiltros;
    });
  }

  onAgregar(): void {
    this.router.navigate(['/orden-de-compra/nuevo']);
  }

  onEditar(item: any): void {
    this.router.navigate(['/orden-de-compra/editar', item.id]);
  }

  onVer(item: any): void {
    this.router.navigate(['/orden-de-compra/ver', item.id]);
  }

  onEliminar(items: any[]): void {
    const peticiones = items.map(item =>
      this.ordenCompraService.anular(item.id)
    );

    forkJoin(peticiones).subscribe({
      next: () => {
        this.cargarOrdenes();
      },
      error: (err) => {
        const mensaje = err.error?.mensaje || 'No se pudo anular la orden de compra';
        alert(mensaje);
        console.error('Error al anular', err);
      }
    });
  }

  puedeEliminar = (item: any): boolean => {
    return item.estado !== 'Recibida' && item.estado !== 'Anulada';
  }
}
