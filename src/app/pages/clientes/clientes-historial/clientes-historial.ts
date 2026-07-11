import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DocSalidaService } from '../../../core/services/docSalida.service';
import { DocSalida } from '../../../core/class/models/docsalida';

@Component({
  selector: 'app-clientes-historial',
  standalone: false,
  templateUrl: './clientes-historial.html',
  styleUrl: './clientes-historial.css',
})
export class ClientesHistorial implements OnInit {
  idCliente = 0;
  
  columns = [
    { key: 'numeroDocumento', label: 'N° Documento' },
    { key: 'tipoDocSalida', label: 'Tipo' },
    { key: 'fechaRegistro', label: 'Fecha de Registro', type: 'date' },
    { key: 'totalSalida', label: 'Total', type: 'currency' },
    { key: 'metodoPago', label: 'Método Pago' }
  ];
  
  data: any[] = [];
  dataOriginal: any[] = [];
  searchText = '';

  constructor(
    private route: ActivatedRoute,
    private docSalidaService: DocSalidaService,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.idCliente = Number(id);
      this.cargarHistorial();
    }
  }

  cargarHistorial(): void {
    this.docSalidaService.listarEgresos().subscribe({
      next: (docs: DocSalida[]) => {
        // Filtrar solo los del cliente actual
        const historial = docs.filter((d: DocSalida) => d.idCliente === this.idCliente);
        
        this.data = historial.map((d: DocSalida) => ({
          iddocsalida: d.iddocsalida,
          numeroDocumento: d.numeroDocumento,
          tipoDocSalida: d.tipoDocSalida,
          fechaRegistro: d.fechaRegistro,
          totalSalida: d.totalSalida,
          metodoPago: d.metodoPago
        }));
        
        this.dataOriginal = [...this.data];
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error al cargar historial', err)
    });
  }

  buscar(texto: string): void {
    this.searchText = texto.toLowerCase();
    this.data = this.dataOriginal.filter(item => {
      return Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(this.searchText);
    });
  }

  Regresar(): void {
    this.location.back();
  }
}
