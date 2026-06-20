import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orden-de-compra',
  standalone: false,
  templateUrl: './orden-de-compra.component.html',
  styleUrl: './orden-de-compra.component.css',
})
export class OrdenDeCompraComponent implements OnInit {
  columns = [
    { key: 'documento', label: 'N° de documento' },
    { key: 'fechaLimite', label: 'Fecha de Límite' },
    { key: 'proveedor', label: 'Proveedor' },
    { key: 'estado', label: 'Estado', type: 'badge' },
    { key: 'montoCompra', label: 'Monto de compra' },
    { key: 'proveedores', label: 'Proveedores' },
  ];

  data: any[] = [];

  // --- INICIO DE DATOS DE PRUEBA AÑADIDOS PARA VISUALIZAR COLORES (BORRAR ANTES DE ENTREGAR) ---
  ngOnInit(): void {
    const estados = ['Generada', 'Pendiente'];
    this.data = estados.map((estado, index) => ({
      documento: `ORDEN-${index + 1}`,
      fechaLimite: '2026-07-01',
      proveedor: 'Proveedor Demo',
      estado: estado,
      montoCompra: 'S/ 500.00',
      proveedores: 'Multimarcas S.A.'
    }));
  }
  // --- FIN DE DATOS DE PRUEBA ---
}
