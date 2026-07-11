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

  // — OSM Autocompletado —
  busquedaDireccion = '';
  sugerencias: any[] = [];
  buscandoDireccion = false;
  showAlertModal = false;
  alertTitle = '';
  alertMessage = '';
  alertType: 'error' | 'success' = 'error';
  errorTexto: Record<string, boolean> = {
    descripcion: false,
    ruc: false,
    codigoUbigeo: false,
    direccion: false,
    departamento: false,
    ciudad: false,
    distrito: false,
    codigoPostal: false,
    referenciaUbicacion: false,
    telefonoEmpresa: false,
    telefonoFijoEmpresa: false,
    celularSectorista: false,
    telefonoFijoSectorista: false,
  };
  private debounceTimer: any;

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

  aplicarTexto(event: Event, campo: string, maxLength: number): void {
    const input = event.target as HTMLInputElement;
    const valorOriginal = input.value;
    const excede = valorOriginal.length > maxLength;
    const valor = valorOriginal.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s.,#/-]/g, '').slice(0, maxLength);
    input.value = valor;
    (this.proveedor as Record<string, any>)[campo] = valor;
    this.errorTexto[campo] = excede;
  }

  aplicarNumeros(event: Event, campo: string, maxLength: number): void {
    const input = event.target as HTMLInputElement;
    const valorOriginal = input.value;
    const excede = valorOriginal.length > maxLength;
    const valor = valorOriginal.replace(/\D/g, '').slice(0, maxLength);
    input.value = valor;
    (this.proveedor as Record<string, any>)[campo] = valor;
    this.errorTexto[campo] = excede;
  }

  // — OSM: buscar dirección con debounce —
  onDireccionInput(): void {
    clearTimeout(this.debounceTimer);

    if (this.busquedaDireccion.length < 3) {
      this.sugerencias = [];
      return;
    }

    this.buscandoDireccion = true;

    this.debounceTimer = setTimeout(() => {
      this.buscarEnOSM(this.busquedaDireccion);
    }, 400); // espera 400ms después de que el usuario deje de escribir
  }

  private buscarEnOSM(texto: string): void {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(texto)}&countrycodes=pe&format=json&addressdetails=1&limit=5`;

    fetch(url, {
      headers: { 'Accept-Language': 'es' }
    })
      .then(res => res.json())
      .then((resultados: any[]) => {
        this.sugerencias = resultados;
        this.buscandoDireccion = false;
        this.cdr.detectChanges();
      })
      .catch(() => {
        this.buscandoDireccion = false;
        this.sugerencias = [];
        this.cdr.detectChanges();
      });
  }

  seleccionarDireccion(sugerencia: any): void {
    const addr = sugerencia.address || {};

    this.busquedaDireccion = sugerencia.display_name;
    this.proveedor.direccion = sugerencia.display_name;

    // Autocompletar campos — OSM puede tener distintos nombres según la zona
    this.proveedor.departamento = addr.state ?? addr.region ?? '';
    this.proveedor.ciudad = addr.city ?? addr.town ?? addr.municipality ?? addr.county ?? '';
    this.proveedor.distrito = addr.suburb ?? addr.village ?? addr.neighbourhood ?? addr.district ?? '';
    this.proveedor.codigoPostal = addr.postcode ?? '';
    // codigoUbigeo queda editable manualmente — OSM no lo tiene

    this.sugerencias = [];
    this.cdr.detectChanges();
  }

  cerrarSugerencias(): void {
    // Pequeño delay para que el click en una sugerencia alcance a ejecutarse antes de cerrar
    setTimeout(() => {
      this.sugerencias = [];
      this.cdr.detectChanges();
    }, 200);
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

  private validarCamposObligatorios(): string[] {
    const errores: string[] = [];

    if (!this.proveedor.descripcion?.trim()) errores.push('Nombre de la empresa');
    if (!this.proveedor.ruc?.trim()) errores.push('RUC');
    if (!this.proveedor.codigoUbigeo?.trim()) errores.push('Código de ubigeo');
    if (!this.proveedor.direccion?.trim()) errores.push('Dirección');
    if (!this.proveedor.departamento?.trim()) errores.push('Departamento');
    if (!this.proveedor.ciudad?.trim()) errores.push('Ciudad');
    if (!this.proveedor.distrito?.trim()) errores.push('Distrito');
    if (!this.proveedor.codigoPostal?.trim()) errores.push('Código postal');
    if (!this.proveedor.correoEmpresa?.trim()) errores.push('Correo de la empresa');
    if (!this.proveedor.telefonoEmpresa?.trim()) errores.push('Teléfono de la empresa');
    if (!this.proveedor.nombreSectorista?.trim()) errores.push('Nombre del sectorista');
    if (!this.proveedor.correoSectorista?.trim()) errores.push('Correo del sectorista');
    if (!this.proveedor.celularSectorista?.trim()) errores.push('Celular del sectorista');

    return errores;
  }

  private mostrarAlerta(title: string, message: string, type: 'error' | 'success'): void {
    this.alertTitle = title;
    this.alertMessage = message;
    this.alertType = type;
    this.showAlertModal = true;
    this.cdr.detectChanges();
  }

  onCerrarAlerta(): void {
    this.showAlertModal = false;
    this.cdr.detectChanges();

    if (this.alertType === 'success') {
      this.router.navigate(['/proveedores']);
    }
  }

  // — Navegación —
  Regresar(): void {
    this.router.navigate(['/proveedores']);
  }

  guardar(): void {
    const errores = this.validarCamposObligatorios();

    if (errores.length > 0) {
      this.mostrarAlerta(
        'Faltan datos por completar',
        'Por favor revisa los siguientes campos:\n• ' + errores.join('\n• '),
        'error'
      );
      return;
    }

    const peticion = this.modoEdicion
      ? this.proveedorService.actualizarProveedor(this.idProveedor!, this.proveedor)
      : this.proveedorService.crearProveedor(this.proveedor);

    peticion.subscribe({
      next: () => {
        this.mostrarAlerta(this.modoEdicion ? 'Proveedor actualizado' : 'Proveedor registrado', 'Los cambios se guardaron correctamente.', 'success');
      },
      error: (err) => {
        console.error(err);
        this.mostrarAlerta('Ocurrió un error', 'No se pudo guardar el proveedor. Inténtalo de nuevo.', 'error');
      }
    });
  }
}