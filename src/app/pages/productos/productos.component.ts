import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../core/class/models/productos';
import {Router} from "@angular/router";
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
  { key: 'precioVenta', label: 'Precio Venta' },
  { key: 'estado', label: 'Estado', type: 'badge' }
];

  data: any[] = [];

  constructor(private productoService: ProductoService, 
              private cdr: ChangeDetectorRef,
              private router: Router) {}

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
        precioVenta: p.precioVenta,
        estado: p.estado,
        proveedor: p.proveedor
      }));

      this.cdr.detectChanges();
      console.log(this.data);
    },

    error: (error) => {
      console.error(error);
    }
  });

}

  onAddProduct(): void {
    this.router.navigate(['/productos/nuevo']);
  }
}