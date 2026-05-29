import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  columns = [
    { key: 'producto', label: 'Producto' },
    { key: 'codigo', label: 'Código' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'unidadMedida', label: 'Unidad de Medida' },
    { key: 'precioVenta', label: 'Precio de Venta' },
    { key: 'estado', label: 'Estado', type: 'badge' },
  ];

  data = [];
}
