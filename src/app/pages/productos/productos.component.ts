import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../core/class/models/productos';
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
    { key: 'unidadMedida', label: 'Unidad de Medida' },
    { key: 'precioVenta', label: 'Precio de Venta' },
    { key: 'estado', label: 'Estado', type: 'badge' },
  ];

  data: any[] = [];

  constructor(private productoService: ProductoService, 
              private cdr: ChangeDetectorRef) {}

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
        unidadMedida: p.unidadMedida_idUnidadMedida,
        precioVenta: p.precioVenta,
        estado: p.estadoProducto_idEstadoProducto
      }));

      this.cdr.detectChanges();  
      console.log('DATA TABLA:', this.data);
    },
    error: (error) => {
      console.error('Error al obtener productos', error);
    }
  });
}
}