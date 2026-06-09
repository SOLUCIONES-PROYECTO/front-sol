import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IngresosService } from '../../core/services/ingresos.service';
import { DocEntrada } from '../../core/class/models/docentrada';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresos',
  standalone: false,
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.css',
})
export class IngresosComponent implements OnInit {

  columns = [
    { key: 'lote', label: 'Lote' },
    { key: 'documento', label: 'N° Documento' },
    { key: 'fecha', label: 'Fecha de ingreso' },
    { key: 'proveedor', label: 'Proveedor' },
    { key: 'estado', label: 'Estado', type: 'badge' },
    { key: 'monto', label: 'Monto Pagado' },
  ];

  data: any[] = [];

  constructor(
    private ingresosService: IngresosService,
    private cdr: ChangeDetectorRef, private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarIngresos();
  }

  cargarIngresos(): void {
    this.ingresosService.listarIngresos().subscribe({
      next: (ingresos) => {

        this.data = ingresos.map((d: DocEntrada) => ({
          lote: d.iddocentrada,
          documento: d.numeroDocumento,
          fecha: d.fecha_ingreso,
          proveedor: d.proveedor_idProveedor,
          estado: d.estadoIngreso_idestadoIngreso,
          monto: d.precioTotal
        }));

        this.cdr.detectChanges();
        console.log('DATA INGRESOS:', this.data);
      },
      error: (err) => {
        console.error('Error al obtener ingresos', err);
      }
    });
  }
  onAddIngresos(): void {
    this.router.navigate(['/ingresos/nuevo']);
  }
}