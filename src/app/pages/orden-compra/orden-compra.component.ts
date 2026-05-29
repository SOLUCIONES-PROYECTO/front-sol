import { Component } from '@angular/core';

@Component({
  selector: 'app-orden-compra',
  standalone: false,
  templateUrl: './orden-compra.component.html',
  styleUrl: './orden-compra.component.css',
})
export class OrdenCompraComponent {
  columns = [
    { key: 'documento', label: 'N° de documento' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'limite', label: 'Límite' },
    { key: 'proveedor', label: 'Proveedor' },
    { key: 'estado', label: 'Estado', type: 'badge' },
    { key: 'monto', label: 'Monto de compra' },
  ];

  data = [];
}
