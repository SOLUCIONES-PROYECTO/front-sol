import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../core/class/models/productos';
import { Router } from "@angular/router";
import { SidebarCounterService } from '../../shared/services/sidebar-counter.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  standalone: false,
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {

  columns = [
    { key: 'producto', label: 'Producto' },
    { key: 'codigo', label: 'Código' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'proveedor', label: 'Proveedor' },
    { key: 'unidadMedida', label: 'Unidad de Medida' },
    { key: 'estado', label: 'Estado', type: 'badge' },
    { key: 'precioVenta', label: 'Precio Venta' },
  ];

  data: any[] = [];
  dataOriginal: any[] = [];
  searchText = '';
  filters = [
    {
      key: 'estado',
      label: 'Estado',
      options: [
        { value: 'Disponible', label: 'Disponible' },
        { value: 'Agotado', label: 'Agotado' }
      ]
    },
    {
      key: 'unidadMedida',
      label: 'Unidad de Medida',
      options: [
        { value: 'Kilogramo', label: 'Kg' },
        { value: 'Unidad', label: 'Unidad' },
        { value: 'Litro', label: 'Litro' }
      ]
    }
  ];
  activeFilters: Record<string, string> = {};

  constructor(private productoService: ProductoService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sidebarCounter: SidebarCounterService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {

    this.productoService.listarProductos().subscribe({

      next: (productos) => {

        this.data = productos.map((p: Producto) => ({
          producto: p.nombre,
          codigo: p.idproducto,
          categoria: p.categoria,
          unidadMedida: p.unidadMedida,
          precioVenta: new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
          }).format(p.precioVenta),
          estado: p.estado,
          proveedor: p.proveedor
        }));

        this.dataOriginal = [...this.data];

        this.sidebarCounter.productosCount.next(
          productos.length
        );

        this.cdr.detectChanges();
        console.log(this.data);
      },

      error: (error) => {
        console.error(error);
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

  onAddProduct(): void {
    this.router.navigate(['/productos/nuevo']);
  }

  editarProducto(item: any): void {
    this.router.navigate(['/productos/editar', item.codigo]);
  }


  eliminarProductos(items: any[]): void {
    const peticiones = items.map(item =>
      this.productoService.eliminarProducto(item.codigo)
    );

    forkJoin(peticiones).subscribe({
      next: () => {
        this.cargarProductos();
      },
      error: (err) => {
        const mensaje = err.error?.mensaje || 'No se pudo eliminar el producto';
        alert(mensaje);
        console.error('Error al eliminar', err);
      }
    });
  }

  puedeEliminar = (item: any): boolean => {
  return item.estado !== 'Disponible'; // true = se puede eliminar (agotado/no disponible)
};

verProducto(item: any): void {
  this.router.navigate(['/productos/ver', item.codigo]);
}

}
