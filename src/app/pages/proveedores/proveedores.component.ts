import { Component } from '@angular/core';

@Component({
  selector: 'app-proveedores',
  standalone: false,
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css',
})
export class ProveedoresComponent {
  columns = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'ruc', label: 'RUC' },
    { key: 'sectorista', label: 'Sectorista Contacto' },
    { key: 'ubicacion', label: 'Sectorista Ubicación' },
    { key: 'ordenes', label: 'Ordenes' },
    { key: 'gastado', label: 'Gastado' },
  ];

  data = [];
}
