import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EgresosService } from '../../core/services/egresos.service';
import { DocSalida } from '../../core/class/models/docsalida';
import { Router } from '@angular/router';
@Component({
  selector: 'app-egresos',
  standalone: false,
  templateUrl: './egresos.component.html',
  styleUrl: './egresos.component.css',
})
export class EgresosComponent implements OnInit {

  columns = [
    { key: 'documento', label: 'N° Documento' },
    { key: 'fecha', label: 'Fecha de egreso' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'metodoPago', label: 'Método de Pago' },
    { key: 'total', label: 'Total' },
  ];

  data: any[] = [];

  constructor(
    private egresosService: EgresosService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEgresos();
  }

  cargarEgresos(): void {
    this.egresosService.listarEgresos().subscribe({
      next: (egresos) => {

        this.data = egresos.map((d: DocSalida) => ({
          documento: d.numeroDocumento,
          fecha: d.fechaEgreso,
          cliente: d.cliente_idcliente, 
          metodoPago: d.metododepago_idmetododepago,
          total: d.totalSalida
        }));

        this.cdr.detectChanges();
        console.log('DATA EGRESOS:', this.data);
      },
      error: (err) => {
        console.error('Error al obtener egresos', err);
      }
    });
  }
  agregarEgreso(): void {
    this.router.navigate(['/egresos/nuevo']);
  }
}