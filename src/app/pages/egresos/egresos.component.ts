import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { DocSalida } from '../../core/class/models/docsalida';
import { DocSalidaService } from '../../core/services/docSalida.service';
import { SidebarCounterService } from '../../shared/services/sidebar-counter.service';
@Component({
  selector: 'app-egresos',
  standalone: false,
  templateUrl: './egresos.component.html',
  styleUrl: './egresos.component.css',
})
export class EgresosComponent implements OnInit {

  columns = [
    { key: 'documento', label: 'N° Documento' },
    { key: 'fecha', label: 'Fecha de egreso' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'metodoPago', label: 'Método de Pago', type: 'badge'},
    { key: 'tipoDocSalida', label: 'Tipo de Salida' },
    { key: 'total', label: 'Total' },
  ];

  data: any[] = [];
  dataOriginal: any[] = [];
  searchText = '';
  filters = [
    {
      key: 'metodoPago',
      label: 'Método de Pago',
      options: [
        { value: 'Yape', label: 'Yape' },
        { value: 'Efectivo', label: 'Efectivo' },
        { value: 'Transferencia', label: 'Transferencia' },
      ]
    },
    {
      key: 'tipoDocSalida',
      label: 'Tipo de Salida',
      options: [
        { value: 'Boleta', label: 'Boleta' },
        { value: 'Factura', label: 'Factura' },
        { value: 'Ticket', label: 'Ticket' },
        { value: 'Merma', label: 'Merma' },
        { value: 'Uso Interno', label: 'Uso Interno' },
        { value: 'Devolucion', label: 'Devolucion' },
      ]
    },
  ];
  activeFilters: Record<string, string> = {};

  constructor(
    private egresosService: DocSalidaService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sidebarCounter: SidebarCounterService,
  ) { }

  ngOnInit(): void {
    this.cargarEgresos();
  }

  cargarEgresos(): void {

    this.egresosService.listarEgresos().subscribe({

      next: (egresos) => {
        this.data = egresos.map((d: DocSalida) => ({
          id: d.iddocsalida,           // ← NUEVO: id real para navegación/eliminación
          documento: d.numeroDocumento,
          fecha: d.fechaEgreso,
          cliente: d.cliente,
          metodoPago: d.metodoPago,
          tipoDocSalida: d.tipoDocSalida,
          total: new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
          }).format(d.totalSalida),
        }));
        this.dataOriginal = [...this.data];

        this.sidebarCounter.egresosCount.next(
          egresos.length
        );

        this.cdr.detectChanges();

      },

      error: (err) => {
        console.error('Error al obtener egresos', err);
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
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(this.searchText);

      const cumpleFiltros =
        Object.entries(this.activeFilters).every(
          ([key, value]) => {

            if (!value) return true;

            return item[key] === value;

          }
        );
      return cumpleBusqueda && cumpleFiltros;
    });

  }
  agregarEgreso(): void {
    this.router.navigate(['/egresos/nuevo']);
  }
  editarEgreso(item: any): void {
    this.router.navigate(['/egresos/editar', item.id]);
}

verEgreso(item: any): void {
    this.router.navigate(['/egresos/ver', item.id]);
}

eliminarEgresos(items: any[]): void {
  const peticiones = items.map(item =>
    this.egresosService.eliminarEgreso(item.id)  // 👈 item.id, no item.documento
  );

  forkJoin(peticiones).subscribe({
    next: () => {
      this.cargarEgresos();
    },
    error: (err) => {
      const mensaje = err.error?.mensaje || 'No se pudo eliminar el egreso';
      alert(mensaje);
      console.error('Error al eliminar', err);
    }
  });
}

puedeEliminar = (item: any): boolean => true;
}