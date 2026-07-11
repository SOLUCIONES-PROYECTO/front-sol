import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ClienteService } from '../../core/services/cliente.service';
import { Cliente } from '../../core/class/models/cliente';
import { SidebarCounterService } from '../../shared/services/sidebar-counter.service';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes implements OnInit {

  columns = [
    { key: 'codigo', label: 'Código' },
    { key: 'nombreCompleto', label: 'Nombre Completo' },
    { key: 'tipoCliente', label: 'Tipo' },
    { key: 'categoria', label: 'Categoría' },
    { key: 'frecuencia', label: 'Frecuencia' },
    { key: 'estado', label: 'Estado', type: 'badge' },
  ];
  
  activeFilters: Record<string, string> = {};
  data: any[] = [];
  dataOriginal: any[] = [];
  searchText = '';
  
  filters = [
    {
      key: 'estado',
      label: 'Estado',
      options: [
        { value: 'Activo', label: 'Activo' },
        { value: 'Inactivo', label: 'Inactivo' },
      ]
    },
    {
      key: 'categoria',
      label: 'Categoría',
      options: [
        { value: 'A', label: 'Clase A' },
        { value: 'B', label: 'Clase B' },
        { value: 'C', label: 'Clase C' },
      ]
    }
  ];

  constructor(
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sidebarCounter: SidebarCounterService
  ) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.listar().subscribe({
      next: (clientes) => {
        this.data = clientes.map((c: Cliente) => ({
          id: c.idcliente,
          codigo: c.codigoCliente,
          nombreCompleto: `${c.nombre} ${c.apellido}`,
          tipoCliente: c.tipoCliente,
          categoria: c.categoriaCliente,
          frecuencia: c.frecuenciaCompra,
          estado: c.estado
        }));
        this.dataOriginal = [...this.data];
        
        // Update sidebar count if possible
        if (this.sidebarCounter && (this.sidebarCounter as any).clientesCount) {
          (this.sidebarCounter as any).clientesCount.next(clientes.length);
        }
        
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener clientes', err);
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

  onAddCliente(): void {
    this.router.navigate(['/clientes/nuevo']);
  }

  editarCliente(item: any): void {
    this.router.navigate(['/clientes/editar', item.id]);
  }

  verCliente(item: any): void {
    this.router.navigate(['/clientes/ver', item.id]);
  }

  eliminarClientes(items: any[]): void {
    const peticiones = items.map(item =>
      this.clienteService.eliminar(item.id)
    );

    forkJoin(peticiones).subscribe({
      next: () => this.cargarClientes(),
      error: (err) => {
        const mensaje = err.error?.mensaje || 'No se pudo eliminar el cliente';
        alert(mensaje);
        console.error('Error al eliminar', err);
      }
    });
  }
}
