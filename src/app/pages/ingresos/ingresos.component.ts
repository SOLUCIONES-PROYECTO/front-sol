import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

import { DocEntradaService } from '../../core/services/docEntrada.service';
import { DocEntrada } from '../../core/class/models/docentrada';
import { SidebarCounterService } from '../../shared/services/sidebar-counter.service';

@Component({
  selector: 'app-ingresos',
  standalone: false,
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.css',
})
export class IngresosComponent implements OnInit {

  columns = [
    { key: 'lote', label: 'Lote' },
    { key: 'documento', label: 'N° Documento' },
    { key: 'fecha', label: 'Fecha de ingreso' },
    { key: 'proveedor', label: 'Proveedor' },
    { key: 'estado', label: 'Estado', type: 'badge' },
    { key: 'monto', label: 'Monto Pagado' },
  ];

  data: any[] = [];
  dataOriginal: any[] = [];
  searchText = '';
  filters = [
    {
      key: 'estado',
      label: 'Estado',
      options: [
        { value: 'Recibido', label: 'Recibido' },
        { value: 'Observado', label: 'Observado' },
        { value: 'Devuelto', label: 'Devuelto' }
      ]
    },
  ];
  activeFilters: Record<string, string> = {};

  constructor(
    private ingresosService: DocEntradaService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sidebarCounter: SidebarCounterService,
  ) { }

  ngOnInit(): void {
    this.cargarIngresos();
  }

  cargarIngresos(): void {

    this.ingresosService.listarIngresos().subscribe({
      next: (ingresos) => {
        this.data = ingresos.map((d: DocEntrada) => ({
          lote: d.iddocentrada,
          documento: d.numeroDocumento,
          fecha: d.fechaIngreso,
          proveedor: d.proveedor,
          estado: d.estadoIngreso,
          monto: new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
          }).format(d.precioTotal),
        }));

        this.dataOriginal = [...this.data];

        this.sidebarCounter.ingresosCount.next(
          ingresos.length
        );

        this.cdr.detectChanges();
        console.log('DATA INGRESOS:', this.data);
      },

      error: (err) => {
        console.error('Error al obtener ingresos', err);
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

  onAddIngresos(): void {
    this.router.navigate(['/ingresos/nuevo']);
  }

  editarIngreso(item: any): void {
    this.router.navigate(['/ingresos/editar', item.lote]);
  }

  verIngreso(item: any): void {
    this.router.navigate(['/ingresos/ver', item.lote]);
  }

  eliminarIngresos(items: any[]): void {
    const peticiones = items.map(item =>
      this.ingresosService.eliminarIngreso(item.lote)
    );

    forkJoin(peticiones).subscribe({
      next: () => {
        this.cargarIngresos();
      },
      error: (err) => {
        const mensaje = err.error?.mensaje || 'No se pudo eliminar el ingreso';
        alert(mensaje);
        console.error('Error al eliminar', err);
      }
    });
  }

  puedeEliminar = (item: any): boolean => {
    return item.estado !== 'Recibido'; // true = se puede eliminar
  };
}