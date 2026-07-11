import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap, of } from 'rxjs';

import { DocSalida } from '../../../core/class/models/docsalida';
import { DetalleSalida } from '../../../core/class/models/detallesalida';
import { DetalleMerma } from '../../../core/class/models/detallemerma';
import { DetalleUsoInterno } from '../../../core/class/models/detalleusointerno';
import { AreaUsoInterno } from '../../../core/class/models/areusointerno';
import { Producto } from '../../../core/class/models/productos';
import { TipoDocSalida } from '../../../core/class/models/tipodocsalida';
import { MetodoPago } from '../../../core/class/models/metodopago';
import { Empleado } from '../../../core/class/models/empleado';

import { DocSalidaService } from '../../../core/services/docSalida.service';
import { DetalleSalidaService } from '../../../core/services/detalleSalida.service';
import { DetalleMermaService } from '../../../core/services/detalleMerma.service';
import { DetalleUsoInternoService } from '../../../core/services/detalleUsoInterno.service';
import { AreaUsoInternoService } from '../../../core/services/areaUsoInterno.service';
import { ProductoService } from '../../../core/services/producto.service';
import { TipoDocSalidaService } from '../../../core/services/tipoDocSalida.service';
import { MetodoPagoService } from '../../../core/services/metodoPago.service';
import { EmpleadoService } from '../../../core/services/empleado.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-egresos-form',
  standalone: false,
  templateUrl: './egresos-form.component.html',
  styleUrl: './egresos-form.component.css',
})
export class EgresosFormComponent implements OnInit {

  docSalida: DocSalida = new DocSalida();

  modoEdicion = false;
  modoVista = false;
  idDocSalida: number | null = null;

  productosDisponibles: Producto[] = [];
  tiposDocSalida: TipoDocSalida[] = [];
  metodosPago: MetodoPago[] = [];
  areasUsoInterno: AreaUsoInterno[] = [];
  empleados: Empleado[] = [];
  empleadoLogueado: Empleado | undefined;


  // — Detalle en memoria —
  detalles: any[] = [];
  showModalProducto = false;

  nuevoDetalle: any = {
    categoria: '',
    idProducto: 0,
    nombreProducto: '',
    codigo: 0,
    cantidad: 0,
    precioUnitario: 0,
    subtotal: 0,
    motivoMerma: '',
    descripcionMerma: '',
    idAreaUsoInterno: 0,
    descripcionUso: ''
  };

  guardando = false;

  // — Modal de alerta (validación / éxito) —
  showAlertModal = false;
  alertTitle = '';
  alertMessage = '';
  alertType: 'error' | 'success' = 'error';

  private mostrarAlerta(title: string, message: string, type: 'error' | 'success'): void {
    this.alertTitle = title;
    this.alertMessage = message;
    this.alertType = type;
    this.showAlertModal = true;
    this.cdr.detectChanges();
  }

  onCerrarAlerta(): void {
    this.showAlertModal = false;
    const fueExito = this.alertType === 'success';
    this.cdr.detectChanges();

    if (fueExito) {
      this.router.navigate(['/egresos']);
    }
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private docSalidaService: DocSalidaService,
    private detalleSalidaService: DetalleSalidaService,
    private detalleMermaService: DetalleMermaService,
    private detalleUsoInternoService: DetalleUsoInternoService,
    private tipoDocSalidaService: TipoDocSalidaService,
    private areaUsoInternoService: AreaUsoInternoService,
    private productoService: ProductoService,
    private metodoPagoService: MetodoPagoService,
    private empleadoService: EmpleadoService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    const modo = this.route.snapshot.data['modo'] || 'nuevo';
    this.modoEdicion = modo === 'editar';
    this.modoVista = modo === 'ver';

    const idParam = this.route.snapshot.paramMap.get('id');
    this.idDocSalida = idParam ? Number(idParam) : null;

    console.log('idParam:', idParam, '| idDocSalida:', this.idDocSalida);

    forkJoin({
      productos: this.productoService.listarProductos(),
      tiposDocSalida: this.tipoDocSalidaService.listar(),
      metodosPago: this.metodoPagoService.listar(),
      areasUsoInterno: this.areaUsoInternoService.listar(),
      empleados: this.empleadoService.listar()
    }).subscribe({
      next: (resultado) => {
        this.productosDisponibles = resultado.productos;
        this.tiposDocSalida = resultado.tiposDocSalida;
        this.metodosPago = resultado.metodosPago;
        this.areasUsoInterno = resultado.areasUsoInterno;
        this.empleados = resultado.empleados;

        this.empleadoLogueado = this.empleados.find(
          e => e.usuarioSistema === this.authService.getUsuarioSistema()
        );

        if (!this.modoEdicion && !this.modoVista && this.empleadoLogueado) {
          this.docSalida.idEmpleado = this.empleadoLogueado.idEmpleado;
        }

        this.cdr.detectChanges();

        if (this.idDocSalida) {
          this.cargarDocSalida(this.idDocSalida);
        }
      },
      error: (err) => console.error(err)
    });
  }

  get tituloFormulario(): string {
    if (this.modoVista) return 'Detalle del Egreso';
    if (this.modoEdicion) return 'Editar Egreso';
    return 'Registrar Egreso';
  }

  get soloLecturaDetalle(): boolean {
    return this.modoVista || this.modoEdicion;
  }

  get empleadoMostrado(): Empleado | undefined {
    if (this.modoEdicion || this.modoVista) {
      return this.empleados.find(e => e.idEmpleado === this.docSalida.idEmpleado);
    }
    return this.empleadoLogueado;
  }

  cargarDocSalida(id: number): void {
    this.docSalidaService.obtener(id).subscribe({
      next: (data) => {
        this.docSalida = data;
        this.cdr.detectChanges();

        if (this.modoEdicion || this.modoVista) {
          this.cargarDetallesExistentes(id);
        }
      },
      error: (err) => console.error(err)
    });
  }

  cargarDetallesExistentes(idDocSalida: number): void {
    this.detalleSalidaService.listar().subscribe({
      next: (todosDetalles) => {
        const detallesDelDoc = todosDetalles.filter(d => d.idDocSalida === idDocSalida);

        if (this.mostrarMerma) {
          this.detalleMermaService.listar().subscribe({
            next: (todasMermas) => {
              this.detalles = detallesDelDoc.map(d => {
                const merma = todasMermas.find(m => m.idDetalleSalida === d.idDetalleSalida);
                return {
                  ...d,
                  motivoMerma: merma?.motivoMerma ?? '',
                  descripcionMerma: merma?.descripcion ?? ''
                };
              });
              this.cdr.detectChanges();
            },
            error: (err) => console.error(err)
          });
        } else if (this.mostrarUsoInterno) {
          this.detalleUsoInternoService.listar().subscribe({
            next: (todosUsos) => {
              this.detalles = detallesDelDoc.map(d => {
                const uso = todosUsos.find(u => u.idDetalleSalida === d.idDetalleSalida);
                return {
                  ...d,
                  nombreAreaUsoInterno: uso?.nombreAreaUsoInterno ?? '',
                  descripcionUso: uso?.descripcion ?? ''
                };
              });
              this.cdr.detectChanges();
            },
            error: (err) => console.error(err)
          });
        } else {
          this.detalles = detallesDelDoc;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error(err)
    });
  }

  Regresar(): void {
    this.router.navigate(['/egresos']);
  }

  get tipoSeleccionadoNombre(): string {
    const tipo = this.tiposDocSalida.find(t => t.idTipoDocSalida === this.docSalida.idTipoDocSalida);
    return tipo?.nombre ?? '';
  }

  get mostrarCliente(): boolean {
    return ['Venta'].includes(this.tipoSeleccionadoNombre);
  }

  get mostrarMerma(): boolean {
    return this.tipoSeleccionadoNombre === 'Merma';
  }

  get mostrarUsoInterno(): boolean {
    return this.tipoSeleccionadoNombre === 'Uso interno';
  }

  get categoriasDisponibles(): string[] {
    return [...new Set(this.productosDisponibles.map(p => p.categoria))];
  }

  get productosFiltradosPorCategoria(): Producto[] {
    if (!this.nuevoDetalle.categoria) return [];
    return this.productosDisponibles.filter(p => p.categoria === this.nuevoDetalle.categoria);
  }

  onTipoEgresoChange(): void {
    // Si cambias el tipo, limpiamos cualquier detalle ya agregado para evitar mezclar estructuras distintas
    this.detalles = [];

    // Auto-seleccionar "No Aplica" para Merma y Uso interno
    if (this.mostrarMerma || this.mostrarUsoInterno) {
      const noAplica = this.metodosPago.find(m => m.nombre === 'No Aplica');
      if (noAplica) {
        this.docSalida.idMetodoPago = noAplica.idMetodoPago;
      }
    }
  }

  abrirModalProducto(): void {
    if (!this.docSalida.idTipoDocSalida) {
      alert('Selecciona primero el tipo de egreso.');
      return;
    }
    this.resetNuevoDetalle();
    this.showModalProducto = true;
    this.cdr.detectChanges();
  }

  cerrarModalProducto(): void {
    this.showModalProducto = false;
    this.cdr.detectChanges();
  }

  resetNuevoDetalle(): void {
    this.nuevoDetalle = {
      categoria: '', idProducto: 0, nombreProducto: '', codigo: 0,
      cantidad: 0, precioUnitario: 0, subtotal: 0,
      motivoMerma: '', descripcionMerma: '',
      idAreaUsoInterno: 0, descripcionUso: ''
    };
  }

  onCategoriaChange(): void {
    this.nuevoDetalle.idProducto = 0;
    this.nuevoDetalle.codigo = 0;
    this.nuevoDetalle.precioUnitario = 0;
    this.recalcularSubtotal();
  }

  onProductoChange(): void {
    const producto = this.productosDisponibles.find(p => p.idproducto === this.nuevoDetalle.idProducto);
    if (producto) {
      this.nuevoDetalle.codigo = producto.idproducto;
      this.nuevoDetalle.nombreProducto = producto.nombre;
      this.nuevoDetalle.precioUnitario = producto.precioVenta;
    }
    this.recalcularSubtotal();
  }

  recalcularSubtotal(): void {
    const cantidad = this.nuevoDetalle.cantidad || 0;
    const precio = this.nuevoDetalle.precioUnitario || 0;
    this.nuevoDetalle.subtotal = +(cantidad * precio).toFixed(2);
  }

  get nuevoDetalleInvalido(): boolean {
    const baseInvalida = !this.nuevoDetalle.idProducto || !this.nuevoDetalle.cantidad || this.nuevoDetalle.cantidad <= 0;
    if (baseInvalida) return true;

    if (this.mostrarMerma && !this.nuevoDetalle.motivoMerma) return true;
    if (this.mostrarUsoInterno && !this.nuevoDetalle.idAreaUsoInterno) return true;

    return false;
  }

  agregarDetalle(): void {
    if (this.nuevoDetalleInvalido) return;

    this.detalles.push({ ...this.nuevoDetalle, tipo: this.tipoSeleccionadoNombre });
    this.showModalProducto = false;
    this.cdr.detectChanges();
  }

  eliminarDetalle(index: number): void {
    this.detalles.splice(index, 1);
    this.cdr.detectChanges();
  }



  // — Resumen en vivo —
  get totalProductosDetalle(): number {
    return this.detalles.length;
  }

  get totalUnidadesDetalle(): number {
    return this.detalles.reduce((sum, d) => sum + d.cantidad, 0);
  }

  get totalEgresoDetalle(): number {
    return this.detalles.reduce((sum, d) => sum + d.subtotal, 0);
  }

  private obtenerFechaRegistroActual(): string {
    const ahora = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${ahora.getFullYear()}-${pad(ahora.getMonth() + 1)}-${pad(ahora.getDate())}T${pad(ahora.getHours())}:${pad(ahora.getMinutes())}:${pad(ahora.getSeconds())}`;
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

    if (!this.modoEdicion && !this.docSalida.idEmpleado) {
      this.mostrarAlerta(
        'No se pudo identificar al empleado',
        'Vuelve a iniciar sesión e inténtalo nuevamente.',
        'error'
      );
      return;
    }

    this.docSalida.totalSalida = this.totalEgresoDetalle;
    this.docSalida.fechaRegistro = this.obtenerFechaRegistroActual();

    this.guardando = true;

    if (this.modoEdicion) {
      this.docSalidaService.actualizar(this.idDocSalida!, this.docSalida).subscribe({
        next: () => {
          this.guardando = false;
          this.mostrarAlerta('Egreso actualizado', 'Los cambios se guardaron correctamente.', 'success');
        },
        error: (err) => {
          this.guardando = false;
          console.error(err);
          this.mostrarAlerta('Ocurrió un error', 'No se pudo actualizar el egreso. Inténtalo de nuevo.', 'error');
        }
      });
      return;
    }

    // Modo "nuevo": header → cada línea → su extra (merma/uso interno) si aplica
    this.docSalidaService.crear(this.docSalida).subscribe({
      next: (docCreado) => {

        if (this.detalles.length === 0) {
          this.guardando = false;
          this.mostrarAlerta('Egreso registrado', 'El egreso se registró correctamente.', 'success');
          return;
        }

        const peticiones = this.detalles.map(item => {

          const detalleSalida = new DetalleSalida({
            idDocSalida: docCreado.iddocsalida,
            idProducto: item.idProducto,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            subtotal: item.subtotal
          });

          return this.detalleSalidaService.crear(detalleSalida).pipe(
            switchMap(detalleCreado => {

              if (item.tipo === 'Merma') {
                const merma = new DetalleMerma({
                  idDetalleSalida: detalleCreado.idDetalleSalida,
                  motivoMerma: item.motivoMerma,
                  descripcion: item.descripcionMerma
                });
                return this.detalleMermaService.crear(merma);
              }

              if (item.tipo === 'Uso interno') {
                const uso = new DetalleUsoInterno({
                  idDetalleSalida: detalleCreado.idDetalleSalida,
                  idAreaUsoInterno: item.idAreaUsoInterno,
                  descripcion: item.descripcionUso
                });
                return this.detalleUsoInternoService.crear(uso);
              }

              return of(detalleCreado);
            })
          );
        });

        forkJoin(peticiones).subscribe({
          next: () => {
            this.guardando = false;
            this.mostrarAlerta('Egreso registrado', 'El egreso y sus productos se guardaron correctamente.', 'success');
          },
          error: (err) => {
            this.guardando = false;
            console.error('Error al guardar el detalle', err);
            this.mostrarAlerta(
              'Egreso creado con errores',
              'El egreso se registró, pero hubo un problema al guardar algunos productos.',
              'error'
            );
          }
        });
      },
      error: (err) => {
        this.guardando = false;
        console.error(err);
        this.mostrarAlerta('Ocurrió un error', 'No se pudo registrar el egreso. Inténtalo de nuevo.', 'error');
      }
    });
}

  esMermaOUsoInterno(): boolean {
    return this.mostrarMerma || this.mostrarUsoInterno;
  }

  metodosPagoFiltrados(): MetodoPago[] {
    if (this.mostrarCliente) { // true solo cuando es 'Venta'
      return this.metodosPago.filter(m => m.nombre !== 'No Aplica');
    }
    return this.metodosPago;
  }


  private validarCamposObligatorios(): string[] {
  const errores: string[] = [];

  if (!this.docSalida.idTipoDocSalida) errores.push('Tipo de egreso');
  if (!this.docSalida.idMetodoPago) errores.push('Método de pago');
  if (this.detalles.length === 0) errores.push('Debe agregar al menos un producto');

  if (this.mostrarCliente) {
    if (!this.docSalida.nombreCliente) errores.push('Nombre del cliente');
    if (!this.docSalida.apellidoCliente) errores.push('Apellido del cliente');
    if (!this.docSalida.dniCliente) errores.push('DNI del cliente');
  }

  return errores;
}


}

