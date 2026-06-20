import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EgresosService } from '../../core/services/egresos.service';
import { DocSalida } from '../../core/class/models/docsalida';
import { Router } from '@angular/router';
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
    private egresosService: EgresosService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sidebarCounter: SidebarCounterService,
  ) { }

  ngOnInit(): void {
    this.cargarEgresos();

    // --- INICIO DE DATOS DE PRUEBA AÑADIDOS PARA VISUALIZAR COLORES (BORRAR ANTES DE ENTREGAR) ---
    setTimeout(() => {
      const datosPrueba = [
        { documento: 'DOC-TEST-1', fecha: '2026-06-20', cliente: 'Cliente Prueba 1', metodoPago: 'Transferencia', tipoDocSalida: 'Factura', total: 'S/ 100.00' },
        { documento: 'DOC-TEST-2', fecha: '2026-06-20', cliente: 'Cliente Prueba 2', metodoPago: 'Yape', tipoDocSalida: 'Boleta', total: 'S/ 50.00' },
        { documento: 'DOC-TEST-3', fecha: '2026-06-20', cliente: 'Cliente Prueba 3', metodoPago: 'Efectivo', tipoDocSalida: 'Factura', total: 'S/ 20.00' },
        { documento: 'DOC-TEST-4', fecha: '2026-06-20', cliente: 'Cliente Prueba 4', metodoPago: 'Pagado', tipoDocSalida: 'Boleta', total: 'S/ 10.00' },
        { documento: 'DOC-TEST-5', fecha: '2026-06-20', cliente: 'Cliente Prueba 5', metodoPago: 'Pendiente', tipoDocSalida: 'Factura', total: 'S/ 5.00' }
      ];
      this.data = [...this.data, ...datosPrueba];
      this.dataOriginal = [...this.dataOriginal, ...datosPrueba];
      this.cdr.detectChanges();
    }, 500);
    // --- FIN DE DATOS DE PRUEBA ---
  }

  cargarEgresos(): void {

    this.egresosService.listarEgresos().subscribe({

      next: (egresos) => {
        this.data = egresos.map((d: DocSalida) => ({
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
        console.log('DATA EGRESOS:', this.data);

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
}