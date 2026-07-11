import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Proveedor } from '../../../core/class/models/proveedores';
import { ProveedorService } from '../../../core/services/proveedores.service';

@Component({
  selector: 'app-proveedor-form',
  standalone: false,
  templateUrl: './proveedores-form.component.html',
  styleUrl: './proveedores-form.component.css',
})
export class ProveedoresFormComponent implements OnInit {

  proveedor: Proveedor = new Proveedor();

  modoEdicion = false;
  modoVista = false;
  idProveedor: number | null = null;

  // Etiquetas 
  etiquetasArray: string[] = [];
  nuevaEtiqueta = '';

  sugerenciasDireccion: any[] = [];
  mostrarSugerencias = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private proveedorService: ProveedorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const modo = this.route.snapshot.data['modo'] || 'nuevo';
    this.modoEdicion = modo === 'editar';
    this.modoVista = modo === 'ver';

    const idParam = this.route.snapshot.paramMap.get('id');
    this.idProveedor = idParam ? Number(idParam) : null;

    if (this.idProveedor) {
      this.cargarProveedor(this.idProveedor);
    }
  }

  get tituloFormulario(): string {
    if (this.modoVista) return 'Detalle del Proveedor';
    if (this.modoEdicion) return 'Editar Proveedor';
    return 'Registrar Proveedor';
  }

  cargarProveedor(id: number): void {
    this.proveedorService.obtenerProveedor(id).subscribe({
      next: (data) => {
        this.proveedor = data;

        // Reconstruir chips desde el string guardado
        this.etiquetasArray = data.etiquetas
          ? data.etiquetas.split(',').map(e => e.trim()).filter(e => e)
          : [];

        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  onDireccionInput(): void {
    const texto = this.proveedor.direccion?.trim() || '';

    if (texto.length < 3) {
      this.sugerenciasDireccion = [];
      this.mostrarSugerencias = false;
      return;
    }

    this.buscarEnOSM(texto);
  }

  buscarEnOSM(texto: string): void {
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&addressdetails=1&accept-language=es&q=${encodeURIComponent(texto)}`;

    fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((respuesta) => respuesta.json())
      .then((data) => {
        this.sugerenciasDireccion = Array.isArray(data) ? data : [];
        this.mostrarSugerencias = this.sugerenciasDireccion.length > 0;
        this.cdr.detectChanges();
      })
      .catch(() => {
        this.sugerenciasDireccion = [];
        this.mostrarSugerencias = false;
        this.cdr.detectChanges();
      });
  }

  seleccionarDireccion(sugerencia: any): void {
    const direccion = sugerencia?.address || {};

    this.proveedor.departamento = direccion.state || direccion.region || '';
    this.proveedor.ciudad = direccion.city || direccion.town || direccion.village || direccion.county || '';
    this.proveedor.distrito = direccion.suburb || direccion.city_district || direccion.neighbourhood || direccion.district || '';
    this.proveedor.codigoPostal = direccion.postcode || '';
    this.proveedor.direccion = sugerencia?.display_name || this.proveedor.direccion;

    this.sugerenciasDireccion = [];
    this.mostrarSugerencias = false;
    this.cdr.detectChanges();
  }

  cerrarSugerencias(): void {
    setTimeout(() => {
      this.sugerenciasDireccion = [];
      this.mostrarSugerencias = false;
      this.cdr.detectChanges();
    }, 150);
  }

  // — Chips de etiquetas —
  agregarEtiqueta(): void {
    const etiqueta = this.nuevaEtiqueta.trim();
    if (!etiqueta || this.etiquetasArray.includes(etiqueta)) return;

    this.etiquetasArray.push(etiqueta);
    this.proveedor.etiquetas = this.etiquetasArray.join(',');
    this.nuevaEtiqueta = '';
  }

  agregarEtiquetaConEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.agregarEtiqueta();
    }
  }

  eliminarEtiqueta(index: number): void {
    this.etiquetasArray.splice(index, 1);
    this.proveedor.etiquetas = this.etiquetasArray.join(',');
  }

  // — Navegación —
  Regresar(): void {
    this.router.navigate(['/proveedores']);
  }

  guardar(): void {
    const peticion = this.modoEdicion
      ? this.proveedorService.actualizarProveedor(this.idProveedor!, this.proveedor)
      : this.proveedorService.crearProveedor(this.proveedor);

    peticion.subscribe({
      next: () => {
        alert(this.modoEdicion ? 'Proveedor actualizado' : 'Proveedor registrado');
        this.router.navigate(['/proveedores']);
      },
      error: (err) => console.error(err)
    });
  }
}