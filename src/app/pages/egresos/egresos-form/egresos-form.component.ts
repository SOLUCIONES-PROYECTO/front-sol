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
import { AuthService } from '../../auth/services/auth.service';

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

  // Tipos excluidos por ahora (Devolución pendiente de Fase futura)
  tiposPermitidos = ['Boleta', 'Factura', 'Ticket', 'Merma', 'Uso interno'];

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
  ) {}

  ngOnInit(): void {

    const modo = this.route.snapshot.data['modo'] || 'nuevo';
    this.modoEdicion = modo === 'editar';
    this.modoVista = modo === 'ver';

    const idParam = this.route.snapshot.paramMap.get('id');
    this.idDocSalida = idParam ? Number(idParam) : null;

    forkJoin({
      productos: this.productoService.listarProductos(),
      tiposDocSalida: this.tipoDocSalidaService.listar(),
      metodosPago: this.metodoPagoService.listar(),
      areasUsoInterno: this.areaUsoInternoService.listar(),
      empleados: this.empleadoService.listar()
    }).subscribe({
      next: (resultado) => {
        this.productosDisponibles = resultado.productos;
        this.tiposDocSalida = resultado.tiposDocSalida.filter(t => this.tiposPermitidos.includes(t.nombre));
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
      },
      error: (err) => console.error(err)
    });
  }

  Regresar(): void {
    this.router.navigate(['/egresos']);
  }

  // — Tipo de egreso seleccionado: nombre exacto, para condicionar secciones —
  get tipoSeleccionadoNombre(): string {
    const tipo = this.tiposDocSalida.find(t => t.idTipoDocSalida === this.docSalida.idTipoDocSalida);
    return tipo?.nombre ?? '';
  }

  get mostrarCliente(): boolean {
    return ['Boleta', 'Factura', 'Ticket'].includes(this.tipoSeleccionadoNombre);
  }

  get mostrarMerma(): boolean {
    return this.tipoSeleccionadoNombre === 'Merma';
  }

  get mostrarUsoInterno(): boolean {
    return this.tipoSeleccionadoNombre === 'Uso interno';
  }

  // — Filtros del modal —
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
  }

  // — Modal —
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

    if (!this.modoEdicion && !this.docSalida.idEmpleado) {
      alert('No se pudo identificar al empleado logueado. Vuelve a iniciar sesión.');
      return;
    }

    this.docSalida.totalSalida = this.totalEgresoDetalle;
    this.docSalida.fechaRegistro = this.obtenerFechaRegistroActual();

    if (this.modoEdicion) {
      this.docSalidaService.actualizar(this.idDocSalida!, this.docSalida).subscribe({
        next: () => {
          alert('Egreso actualizado');
          this.router.navigate(['/egresos']);
        },
        error: (err) => console.error(err)
      });
      return;
    }

    // Modo "nuevo": header → cada línea → su extra (merma/uso interno) si aplica
    this.docSalidaService.crear(this.docSalida).subscribe({
      next: (docCreado) => {

        if (this.detalles.length === 0) {
          alert('Egreso registrado');
          this.router.navigate(['/egresos']);
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
            alert('Egreso registrado');
            this.router.navigate(['/egresos']);
          },
          error: (err) => {
            console.error('Error al guardar el detalle', err);
            alert('El egreso se creó, pero hubo un error guardando algunos productos.');
            this.router.navigate(['/egresos']);
          }
        });
      },
      error: (err) => console.error(err)
    });
  }
}