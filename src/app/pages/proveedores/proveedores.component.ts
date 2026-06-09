import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProveedorService } from '../../core/services/proveedores.service';
import { Proveedor } from '../../core/class/models/proveedores';

@Component({
  selector: 'app-proveedores',
  standalone: false,
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css',
})
export class ProveedoresComponent implements OnInit {

  columns = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'ruc', label: 'RUC' },
    { key: 'sectorista', label: 'Sectorista' },
    { key: 'telefono', label: 'Teléfono Sectorista' },
    { key: 'ubicacion', label: 'Ubicación' },
    { key: 'correo', label: 'Correo Empresa' },
    { key: 'calificacion', label: 'Calificación', type: 'badge' },
  ];

  data: any[] = [];

  constructor(
    private proveedorService: ProveedorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedorService.listarProveedores().subscribe({
      next: (proveedores) => {

        this.data = proveedores.map((p: Proveedor) => ({
          nombre: p.descripcion,
          ruc: p.RUC,
          sectorista: p.nombreSectorista,
          telefono: p.celularSectorista,
          ubicacion: `${p.direccion}, ${p.ciudad}, ${p.departamento}`,
          correo: p.correoEmpresa,
          calificacion: p.calificacion
        }));

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener proveedores', err);
      }
    });
  }
  
}