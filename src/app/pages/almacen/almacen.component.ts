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

        this.data = productos.map((p: Producto) => ({
          id: p.idproducto,          // ← NUEVO: necesario para navegar al detalle
          imagen: p.imagen,
          producto: p.nombre,
          categoria: p.categoria,
          stockActual: p.stockActual,
          stockMinimo: p.stockMinimo,
          estado: p.estado,
          fechaVencimiento: this.formatearFecha(
            vencimientoPorProducto.get(p.idproducto)
          ),
        }));

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

  // Por cada producto, busca el lote con la fecha de vencimiento MÁS PRÓXIMA (FEFO)
  private obtenerFechaMasProximaPorProducto(
    detalles: DetalleEntrada[]
  ): Map<number, Date> {

    const mapa = new Map<number, Date>();

    detalles.forEach(d => {
      const actual = mapa.get(d.idProducto);

      if (!actual || d.fechaVencimiento < actual) {
        mapa.set(d.idProducto, d.fechaVencimiento);
      }
    });

    return mapa;
  }

  private formatearFecha(fecha: Date | undefined): string {
    if (!fecha) return '—'; // producto sin entradas registradas

    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(fecha);
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