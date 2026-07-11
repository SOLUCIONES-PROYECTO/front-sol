import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { EmpleadoService } from '../../core/services/empleado.service';

@Component({
  selector: 'app-ajustes-globales',
  standalone: false,
  templateUrl: './ajustes-globales.component.html',
  styleUrl: './ajustes-globales.component.css',
})
export class AjustesGlobalesComponent implements OnInit {

  // NUEVO: Pestaña activa
  activeTab: 'empleados' | 'historial' | 'lotes' | 'alertas' = 'empleados';

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'apellido', label: 'Apellido' },
    { key: 'cargo', label: 'Cargo' },
    { key: 'area', label: 'Área' },
    { key: 'rol', label: 'Rol' },
    { key: 'usuarioSistema', label: 'Usuario' },
    { key: 'estado', label: 'Estado', type: 'badge' },
  ];

  data: any[] = [];
  dataOriginal: any[] = [];
  searchText = '';
  filters = [
    {
      key: 'area',
      label: 'Área',
      options: [
        { value: 'Ventas', label: 'Ventas' },
        { value: 'Almacén', label: 'Almacén' },
        { value: 'Administración', label: 'Administración' },
        { value: 'Contabilidad', label: 'Contabilidad' },
      ]
    },
    {
      key: 'cargo',
      label: 'Cargo',
      options: [
        { value: 'Vendedor', label: 'Vendedor' },
        { value: 'Jefe de Compras', label: 'Jefe de Compras' },
        { value: 'Almacenero', label: 'Almacenero' },
        { value: 'Contador', label: 'Contador' },
      ]
    },
  ];
  activeFilters: Record<string, string> = {};

  constructor(
    private empleadoService: EmpleadoService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.listar().subscribe({
      next: (empleados) => {
        this.data = empleados.map(e => ({
          id: e.idEmpleado,
          nombre: e.nombre,
          apellido: e.apellido,
          cargo: e.cargo,
          area: e.area,
          rol: e.rol,
          usuarioSistema: e.usuarioSistema,
          estado: e.estado,
        }));
        this.dataOriginal = [...this.data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener empleados', err)
    });
  }

  buscar(texto: string): void {
    this.searchText = texto.toLowerCase();
    this.aplicarFiltros();
  }

  filtrar(filter: { key: string; value: string }): void {
    this.activeFilters[filter.key] = filter.value;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.data = this.dataOriginal.filter(item => {
      const cumpleBusqueda =
        Object.values(item).join(' ').toLowerCase().includes(this.searchText);

      const cumpleFiltros =
        Object.entries(this.activeFilters).every(([key, value]) => {
          if (!value) return true;
          return item[key] === value;
        });

      return cumpleBusqueda && cumpleFiltros;
    });
  }

  onEditar(item: any): void {
    this.router.navigate(['/ajustes-globales/editar', item.id]);
  }

  onVer(item: any): void {
    this.router.navigate(['/ajustes-globales/ver', item.id]);
  }

  onEliminar(items: any[]): void {
    const peticiones = items.map(item => this.empleadoService.eliminar(item.id));

    forkJoin(peticiones).subscribe({
      next: () => this.cargarEmpleados(),
      error: (err) => {
        console.error('Error al desactivar empleado', err);
        alert('No se pudo desactivar el empleado.');
      }
    });
  }
}