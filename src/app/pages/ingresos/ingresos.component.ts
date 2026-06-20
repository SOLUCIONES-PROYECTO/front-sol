import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IngresosService } from '../../core/services/ingresos.service';
import { DocEntrada } from '../../core/class/models/docentrada';
import { Router } from '@angular/router';
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
    private ingresosService: IngresosService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sidebarCounter: SidebarCounterService,
  ) { }

  ngOnInit(): void {
    this.cargarIngresos();

    // --- INICIO DE DATOS DE PRUEBA AÑADIDOS PARA VISUALIZAR COLORES (BORRAR ANTES DE ENTREGAR) ---
    setTimeout(() => {
      const estadosFigma = [
        'Recibido', 'En camino'
      ];
      const datosPrueba = estadosFigma.map((estado, index) => ({
        lote: `PRUEBA-${index}`,
        documento: `DOC-TEST-${index}`,
        fecha: '2026-06-20',
        proveedor: 'Proveedor Demo',
        estado: estado,
        monto: 'S/ 0.00'
      }));
      this.data = [...this.data, ...datosPrueba];
      this.dataOriginal = [...this.dataOriginal, ...datosPrueba];
      this.cdr.detectChanges();
    }, 500); // 500ms para asegurar que se agreguen después de que termine cargarIngresos si no hay red
    // --- FIN DE DATOS DE PRUEBA ---
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
}