import { Component } from '@angular/core';

@Component({
  selector: 'app-egresos',
  standalone: false,
  templateUrl: './egresos.component.html',
  styleUrl: './egresos.component.css',
})
export class EgresosComponent {
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
