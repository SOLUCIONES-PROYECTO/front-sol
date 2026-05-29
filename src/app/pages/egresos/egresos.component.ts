import { Component } from '@angular/core';

@Component({
  selector: 'app-egresos',
  standalone: false,
  templateUrl: './egresos.component.html',
  styleUrl: './egresos.component.css',
})
export class EgresosComponent {
  columns = [
    { key: 'documento', label: 'N° Documento' },
    { key: 'fecha', label: 'Fecha de egreso' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'estadoPago', label: 'Estado de Pago', type: 'badge' },
    { key: 'metodoPago', label: 'Método de Pago' },
    { key: 'total', label: 'Total' },
  ];

  data = [];
}
