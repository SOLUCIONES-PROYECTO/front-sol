import { Component } from '@angular/core';

@Component({
  selector: 'app-almacen',
  standalone: false,
  templateUrl: './almacen.html',
  styleUrl: './almacen.css',
})
export class AlmacenComponent {
  columns = [
    { key: 'producto', label: 'Producto' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'stockActual', label: 'Stock Actual' },
    { key: 'stockMinimo', label: 'Stock Mínimo' },
    { key: 'fechaVencimiento', label: 'Fecha de Vencimiento' },
    { key: 'disponibilidad', label: 'Disponibilidad', type: 'badge' },
  ];

  data = [];
}
