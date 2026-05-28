import { Component } from '@angular/core';

@Component({
  selector: 'app-ingresos',
  standalone: false,
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.css',
})
export class IngresosComponent {

  columns = [
    { key: 'lote', label: 'Lote' },
    { key: 'documento', label: 'N° Documento' },
    { key: 'fecha', label: 'Fecha de ingreso' },
    { key: 'proveedor', label: 'Proveedor' },
    { key: 'estado', label: 'Estado', type: 'badge' },
    { key: 'monto', label: 'Monto Pagado' },
  ];

  data = [];

}