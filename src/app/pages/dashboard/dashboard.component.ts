import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  // --- INICIO DE DATOS DE PRUEBA AÑADIDOS PARA VISUALIZAR EL DASHBOARD (BORRAR ANTES DE ENTREGAR) ---
  metricas: any = {
    ganancias: { valor: 'S/ 24,500', porcentaje: 15.2, positivo: true },
    compras: { valor: '1,250', porcentaje: 5.4, positivo: true },
    ventas: { valor: '3,420', porcentaje: 2.1, positivo: false },
    ingresos: { valor: 'S/ 18,200', porcentaje: 8.5, positivo: true },
    salidas: { valor: 'S/ 6,300', porcentaje: 4.3, positivo: false }
  };

  ingresosRecientes: any[] = [
    { producto: 'Galletas Soda', fecha: '2026-06-20', cantidad: 150, estado: 'Recibido' },
    { producto: 'Leche Gloria', fecha: '2026-06-19', cantidad: 300, estado: 'Recibido' },
    { producto: 'Detergente Ariel', fecha: '2026-06-19', cantidad: 50, estado: 'Pendiente' },
    { producto: 'Arroz Costeño 50kg', fecha: '2026-06-18', cantidad: 20, estado: 'Completado' },
    { producto: 'Aceite Primor', fecha: '2026-06-18', cantidad: 120, estado: 'En camino' }
  ];

  productosVendidos: any[] = [
    { producto: 'Gaseosa Inka Kola 3L', precio: 'S/ 11.50', total: 450 },
    { producto: 'Cerveza Pilsen 620ml', precio: 'S/ 7.00', total: 380 },
    { producto: 'Papel Higiénico Suave', precio: 'S/ 2.50', total: 310 },
    { producto: 'Atún Florida', precio: 'S/ 5.80', total: 290 },
    { producto: 'Fideos Don Vittorio', precio: 'S/ 3.20', total: 250 }
  ];

  listaPrecios: any[] = [
    { producto: 'Galletas Soda', precio: 'S/ 1.00' },
    { producto: 'Leche Gloria', precio: 'S/ 4.20' },
    { producto: 'Detergente Ariel', precio: 'S/ 8.50' },
    { producto: 'Arroz Costeño 1kg', precio: 'S/ 3.80' },
    { producto: 'Aceite Primor 1L', precio: 'S/ 10.00' },
    { producto: 'Gaseosa Inka Kola 3L', precio: 'S/ 11.50' },
    { producto: 'Cerveza Pilsen 620ml', precio: 'S/ 7.00' },
    { producto: 'Papel Higiénico Suave', precio: 'S/ 2.50' },
    { producto: 'Atún Florida', precio: 'S/ 5.80' },
    { producto: 'Fideos Don Vittorio', precio: 'S/ 3.20' },
    { producto: 'Azúcar Rubia 1kg', precio: 'S/ 4.50' },
    { producto: 'Huevos Pardo x1kg', precio: 'S/ 9.00' }
  ];

  ngOnInit(): void {
    // Aquí el backend enviaría los datos reales en el futuro.
  }
  // --- FIN DE DATOS DE PRUEBA ---
}
