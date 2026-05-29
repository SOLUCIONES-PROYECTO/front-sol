import { Component } from '@angular/core';

@Component({
  selector: 'app-orden-de-compra',
  standalone: false,
  templateUrl: './orden-de-compra.component.html',
  styleUrl: './orden-de-compra.component.css',
})
export class OrdenDeCompraComponent {
  columns = [
    { key: 'documento', label: 'N° de documento' },
    { key: 'fechaLimite', label: 'Fecha de Límite' },
    { key: 'proveedor', label: 'Proveedor' },
    { key: 'estado', label: 'Estado', type: 'badge' },
    { key: 'montoCompra', label: 'Monto de compra' },
    { key: 'proveedores', label: 'Proveedores' },
  ];

  data = [];
}
