import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProveedorService } from '../../core/services/proveedores.service';
import { Proveedor } from '../../core/class/models/proveedores';
import { SidebarCounterService } from '../../shared/services/sidebar-counter.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
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
  activeFilters: Record<string, string> = {};

  data: any[] = [];
  dataOriginal: any[] = [];
  searchText = '';
  filters = [
    {
      key: 'calificacion',
      label: 'Calificacion',
      options: [
        { value: 'Buena', label: 'Buena' },
      ]
    },
  ];

  constructor(
    private proveedorService: ProveedorService,
    private cdr: ChangeDetectorRef,
    private sidebarCounter: SidebarCounterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedorService.listarProveedor().subscribe({
      next: (proveedores) => {

        this.data = proveedores.map((p: Proveedor) => ({
          id: p.idProveedor,
          nombre: p.descripcion,
          ruc: p.ruc,
          sectorista: p.nombreSectorista,
          telefono: p.celularSectorista,
          ubicacion: `${p.direccion}, ${p.ciudad}, ${p.departamento}`,
          correo: p.correoEmpresa,
          calificacion: p.calificacion
        }));

        this.dataOriginal = [...this.data];

        this.sidebarCounter.proveedoresCount.next(
          proveedores.length
        );

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener proveedores', err);
      }
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
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(this.searchText);

      const cumpleFiltros =
        Object.entries(this.activeFilters).every(
          ([key, value]) => {

            if (!value) return true;

            return item[key] === value;

          }
        );
      return cumpleBusqueda && cumpleFiltros;
    });

  }
  onAddProveedores(): void {
    this.router.navigate(['/proveedores/nuevo']);
  }

  editarProveedor(item: any): void {
    this.router.navigate(['/proveedores/editar', item.id]);
  }

  verProveedor(item: any): void {
    this.router.navigate(['/proveedores/ver', item.id]);
  }

  eliminarProveedores(items: any[]): void {
    const peticiones = items.map(item =>
      this.proveedorService.eliminarProveedor(item.id) // ajusta si tu service tiene otro nombre de método
    );

    forkJoin(peticiones).subscribe({
      next: () => this.cargarProveedores(),
      error: (err) => {
        const mensaje = err.error?.mensaje || 'No se pudo eliminar el proveedor';
        alert(mensaje);
        console.error('Error al eliminar', err);
      }
    });
  }

}