import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductoService } from '../../core/services/producto.service';
import { DetalleEntradaService } from '../../core/services/detalleEntrada.service';
import { Producto } from '../../core/class/models/productos';
import { DetalleEntrada } from '../../core/class/models/detalleentrada';
import { SidebarCounterService } from '../../shared/services/sidebar-counter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-almacen',
  standalone: false,
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.css',
})
export class AlmacenComponent implements OnInit {

columns = [
  { key: 'imagen', label: '', type: 'image' },
  { key: 'producto', label: 'Producto' },
  { key: 'categoria', label: 'Categoría' },
  { key: 'stockActual', label: 'Stock Actual' },
  { key: 'stockMinimo', label: 'Stock Mínimo' },
  { key: 'fechaVencimiento', label: 'Fecha de Vencimiento' },
  { key: 'estado', label: 'Disponibilidad', type: 'badge' },
];

  data: any[] = [];
  dataOriginal: any[] = [];
  searchText = '';
  filters = [
    {
      key: 'categoria',
      label: 'Categoría',
      options: [
        { value: 'Abarrotes', label: 'Abarrotes' },
        { value: 'Lácteos', label: 'Lácteos' },
        { value: 'Limpieza', label: 'Limpieza' }
      ]
    },
  ];
  activeFilters: Record<string, string> = {};

  constructor(
    private productoService: ProductoService,
    private detalleEntradaService: DetalleEntradaService,
    private cdr: ChangeDetectorRef,
    private sidebarCounter: SidebarCounterService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cargarAlmacen();
  }

  cargarAlmacen(): void {

    forkJoin({
      productos: this.productoService.listarProductos(),
      detalles: this.detalleEntradaService.listar()
    }).subscribe({

      next: ({ productos, detalles }) => {

        const vencimientoPorProducto = this.obtenerFechaMasProximaPorProducto(detalles);

        this.data = productos
          .map((p: Producto) => {
            const fechaVencimiento = vencimientoPorProducto.get(p.idproducto);

            return {
              id: p.idproducto,
              imagen: p.imagen,
              producto: p.nombre,
              categoria: p.categoria,
              stockActual: p.stockActual,
              stockMinimo: p.stockMinimo,
              estado: this.obtenerDisponibilidad(
                p.stockActual,
                fechaVencimiento
              ),
              fechaVencimiento: this.formatearFecha(fechaVencimiento),
              fechaVencimientoDate: fechaVencimiento ?? null,
            };
          })
          .sort((a, b) => {
            const fechaA = a.fechaVencimientoDate?.getTime() ?? Number.MAX_SAFE_INTEGER;
            const fechaB = b.fechaVencimientoDate?.getTime() ?? Number.MAX_SAFE_INTEGER;

            return fechaA - fechaB;
          });

        this.dataOriginal = [...this.data];

        this.sidebarCounter.almacenCount.next(productos.length);

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Error al obtener almacén', err);
      }
    });
  }

  onVer(item: any): void {
    this.router.navigate(['/almacen/ver', item.id]);
  }

  //Disponibilidad
  private obtenerDisponibilidad(
    stockActual: number,
    fechaVencimiento?: Date | null
  ): string {

    if (stockActual === 0) {
      return 'Agotado';
    }

    if (fechaVencimiento && fechaVencimiento < new Date()) {
      return 'Vencido';
    }

    return 'Disponible';
  }

  // Por cada producto, busca el lote con la fecha de vencimiento MÁS PRÓXIMA (FEFO)
  private obtenerFechaMasProximaPorProducto(
    detalles: DetalleEntrada[]
  ): Map<number, Date> {

    const mapa = new Map<number, Date>();

    detalles.forEach((detalle) => {
      const fechaVencimiento = this.normalizarFecha(detalle.fechaVencimiento);

      if (!fechaVencimiento) {
        return;
      }

      const actual = mapa.get(detalle.idProducto);

      if (!actual || fechaVencimiento < actual) {
        mapa.set(detalle.idProducto, fechaVencimiento);
      }
    });

    return mapa;
  }

  private normalizarFecha(fecha: Date | string | null | undefined): Date | null {
    if (!fecha) {
      return null;
    }

    const fechaParseada = fecha instanceof Date ? fecha : new Date(fecha);

    return Number.isNaN(fechaParseada.getTime()) ? null : fechaParseada;
  }

  private formatearFecha(fecha: Date | string | null | undefined): string {
    const fechaNormalizada = this.normalizarFecha(fecha);

    if (!fechaNormalizada) {
      return '—';
    }

    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(fechaNormalizada);
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
}