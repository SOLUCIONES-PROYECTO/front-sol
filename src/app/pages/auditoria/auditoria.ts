import { Component, OnInit } from '@angular/core';
import { AuditoriaService } from '../../core/services/auditoria.service';

@Component({
  selector: 'app-auditoria',
  standalone: false,
  templateUrl: './auditoria.html',
  styleUrls: ['./auditoria.css']
})
export class AuditoriaComponent implements OnInit {

  logs: any[] = [];
  cargando = true;

  constructor(private auditoriaService: AuditoriaService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.auditoriaService.listar().subscribe({
      next: (data) => {
        this.logs = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar auditoría', err);
        this.cargando = false;
      }
    });
  }

  formatearFecha(fecha: string): string {
    const d = new Date(fecha);
    return d.toLocaleString('es-PE', { hour12: true });
  }

  getBadgeColor(accion: string): string {
    switch (accion.toUpperCase()) {
      case 'CREAR': return 'bg-green-100 text-green-800';
      case 'ACTUALIZAR': return 'bg-blue-100 text-blue-800';
      case 'ELIMINAR': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
