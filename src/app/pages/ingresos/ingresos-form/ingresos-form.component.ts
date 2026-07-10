import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { DocEntrada } from '../../../core/class/models/docentrada';
import { DetalleEntrada } from '../../../core/class/models/detalleentrada';
import { Proveedor } from '../../../core/class/models/proveedores';
import { Producto } from '../../../core/class/models/productos';
import { TipoDocEntrada } from '../../../core/class/models/tipodocentrada';
import { MetodoPago } from '../../../core/class/models/metodopago';
import { EstadoPago } from '../../../core/class/models/estadopago';
import { EstadoIngreso } from '../../../core/class/models/estadoingreso';
import { Empleado } from '../../../core/class/models/empleado';

import { DocEntradaService } from '../../../core/services/docEntrada.service';
import { ProveedorService } from '../../../core/services/proveedores.service';
import { ProductoService } from '../../../core/services/producto.service';
import { TipoDocEntradaService } from '../../../core/services/tipoDocEntrada.service';
import { MetodoPagoService } from '../../../core/services/metodoPago.service';
import { EstadoPagoService } from '../../../core/services/estadoPago.service';
import { EstadoIngresoService } from '../../../core/services/estadoIngreso.service';
import { DetalleEntradaService } from '../../../core/services/detalleEntrada.service';
import { EmpleadoService } from '../../../core/services/empleado.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { OrdenCompra } from '../../../core/class/models/ordencompra';
import { OrdenCompraService } from '../../../core/services/ordenCompra.service';


@Component({
  selector: 'app-ingresos-form',
  standalone: false,
  templateUrl: './ingresos-form.component.html',
  styleUrl: './ingresos-form.component.css',
})
export class IngresosFormComponent implements OnInit {

  docEntrada: DocEntrada = new DocEntrada();

  modoEdicion = false;
  modoVista = false;
  idDocEntrada: number | null = null;

  proveedores: Proveedor[] = [];
  tiposDocEntrada: TipoDocEntrada[] = [];
  metodosPago: MetodoPago[] = [];
  estadosPago: EstadoPago[] = [];
  estadosIngreso: EstadoIngreso[] = [];
  productosDisponibles: Producto[] = [];
  ordenesCompra: any[] = [];
  ordenSeleccionada: any = [];
  detalles: DetalleEntrada[] = [];
  showModalProducto = false;
  detalleEditandoIndex: number | null = null;

  empleados: Empleado[] = [];
  empleadoLogueado: Empleado | undefined;

  nuevoDetalle = {
    categoria: '',
    idProducto: 0,
    codigo: 0,
    unidadMedida: '',
    loteProducto: '',
    fechaVencimiento: '',
    cantidad: 0,
    precioCompra: 0,
    subtotal: 0
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private docEntradaService: DocEntradaService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private tipoDocEntradaService: TipoDocEntradaService,
    private metodoPagoService: MetodoPagoService,
    private estadoPagoService: EstadoPagoService,
    private estadoIngresoService: EstadoIngresoService,
    private detalleEntradaService: DetalleEntradaService,
    private empleadoService: EmpleadoService,
    private authService: AuthService,
    private ordenCompraService: OrdenCompraService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const modo = this.route.snapshot.data['modo'] || 'nuevo';
    this.modoEdicion = modo === 'editar';
    this.modoVista = modo === 'ver';

    const idParam = this.route.snapshot.paramMap.get('id');
    this.idDocEntrada = idParam ? Number(idParam) : null;

    forkJoin({
      proveedores: this.proveedorService.listarProveedor(),
      productos: this.productoService.listarProductos(),
      tiposDocEntrada: this.tipoDocEntradaService.listar(),
      metodosPago: this.metodoPagoService.listar(),
      estadosPago: this.estadoPagoService.listar(),
      estadosIngreso: this.estadoIngresoService.listar(),
      ordenesCompra: this.ordenCompraService.listar(),
      empleados: this.empleadoService.listar()
    }).subscribe({
      next: (resultado) => {
        this.proveedores = resultado.proveedores;
        this.productosDisponibles = resultado.productos;
        this.tiposDocEntrada = resultado.tiposDocEntrada;
        this.metodosPago = resultado.metodosPago.filter(m => m.nombre !== 'No Aplica');
        this.estadosPago = resultado.estadosPago;
        this.estadosIngreso = resultado.estadosIngreso.filter(e => e.nombre !== 'Eliminado');
        this.ordenesCompra = resultado.ordenesCompra;
        this.empleados = resultado.empleados;

        this.empleadoLogueado = this.empleados.find(
          e => e.usuarioSistema === this.authService.getUsuarioSistema()
        );

        if (!this.modoEdicion && !this.modoVista && this.empleadoLogueado) {
          this.docEntrada.idEmpleado = this.empleadoLogueado.idEmpleado;
        }

        this.cdr.detectChanges();

        if (this.idDocEntrada) {
          this.cargarDocEntrada(this.idDocEntrada);
        }
      },
      error: (err) => console.error(err)
    });
  }

  get tituloFormulario(): string {
    if (this.modoVista) return 'Detalle del Ingreso';
    if (this.modoEdicion) return 'Editar Ingreso';
    return 'Registrar Ingreso';
  }

  get empleadoMostrado(): Empleado | undefined {
    if (this.modoEdicion || this.modoVista) {
      return this.empleados.find(e => e.idEmpleado === this.docEntrada.idEmpleado);
    }
    return this.empleadoLogueado;
  }

  cargarDocEntrada(id: number): void {
    this.docEntradaService.obtenerIngreso(id).subscribe({
      next: (data) => {
        this.docEntrada = data;
        this.cdr.detectChanges();

        if (this.modoEdicion || this.modoVista) {
          this.cargarDetallesExistentes(id);
        }
      },
      error: (err) => console.error(err)
    });
  }

  cargarDetallesExistentes(idDocEntrada: number): void {
    this.detalleEntradaService.listar().subscribe({
      next: (todos) => {
        this.detalles = todos.filter(d => d.idDocEntrada === idDocEntrada);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  get soloLecturaDetalle(): boolean {
    return this.modoVista || this.modoEdicion;
  }

  // — Filtros en cascada: proveedor (header) → categoría → producto —

  get productosDelProveedor(): Producto[] {
    if (!this.docEntrada.idProveedor) return [];
    return this.productosDisponibles.filter(
      p => p.idProveedor === this.docEntrada.idProveedor
    );
  }

  get categoriasDelProveedor(): string[] {
    const categorias = this.productosDelProveedor.map(p => p.categoria);
    return [...new Set(categorias)];
  }

  get productosFiltradosPorCategoria(): Producto[] {
    if (!this.nuevoDetalle.categoria) return [];
    return this.productosDelProveedor.filter(
      p => p.categoria === this.nuevoDetalle.categoria
    );
  }

  // — Modal: abrir / cerrar / resetear —

  abrirModalProducto(): void {
    if (!this.docEntrada.idProveedor) {
      alert('Selecciona un proveedor antes de agregar productos.');
      return;
    }

    console.log('idProveedor seleccionado:', this.docEntrada.idProveedor);
    console.log('productos disponibles:', this.productosDisponibles);
    console.log('productos de ese proveedor:', this.productosDelProveedor);

    if (this.productosDelProveedor.length === 0) {
      alert('Este proveedor no tiene productos registrados. Regístralos primero en Productos.');
      return;
    }

    this.resetNuevoDetalle();
    this.detalleEditandoIndex = null;
    this.showModalProducto = true;
    this.cdr.detectChanges();
  }

  cerrarModalProducto(): void {
    this.detalleEditandoIndex = null;
    this.showModalProducto = false;
    this.cdr.detectChanges();
  }

  resetNuevoDetalle(): void {
    this.nuevoDetalle = {
      categoria: '',
      idProducto: 0,
      codigo: 0,
      unidadMedida: '',
      loteProducto: '',
      fechaVencimiento: '',
      cantidad: 0,
      precioCompra: 0,
      subtotal: 0
    };
  }

    editarDetalle(index: number): void {
    const detalle = this.detalles[index];
    if (!detalle) return;

    const producto = this.productosDelProveedor.find(p => p.idproducto === detalle.idProducto);

    this.nuevoDetalle = {
      categoria: producto?.categoria || '',
      idProducto: detalle.idProducto,
      codigo: detalle.idProducto,
      unidadMedida: producto?.unidadMedida || '',
      loteProducto: detalle.loteProducto,
      fechaVencimiento: this.formatInputDate(detalle.fechaVencimiento),
      cantidad: detalle.cantidad,
      precioCompra: detalle.precioUnitario,
      subtotal: detalle.subtotal
    };

    this.detalleEditandoIndex = index;
    this.showModalProducto = true;
    this.cdr.detectChanges();
  }

  private formatInputDate(value: string | Date): string {
    const date = typeof value === 'string' ? new Date(value) : value;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  get confirmTextModal(): string {
    return this.detalleEditandoIndex !== null ? 'Actualizar' : 'Agregar';
  }

  // — Cascada dentro del modal —

  onCategoriaChange(): void {
    this.nuevoDetalle.idProducto = 0;
    this.nuevoDetalle.codigo = 0;
    this.nuevoDetalle.unidadMedida = '';
    this.nuevoDetalle.precioCompra = 0;
    this.recalcularSubtotal();
  }

  onProductoChange(): void {
    const producto = this.productosDelProveedor.find(
      p => p.idproducto === this.nuevoDetalle.idProducto
    );

    if (producto) {
      this.nuevoDetalle.codigo = producto.idproducto;
      this.nuevoDetalle.unidadMedida = producto.unidadMedida;
      this.nuevoDetalle.precioCompra = producto.precioCompra;
      if (this.ordenSeleccionada?.detalles) {
        const detalleOrden = this.ordenSeleccionada.detalles.find(
          (d: any) => d.idProducto === this.nuevoDetalle.idProducto
        );
        this.nuevoDetalle.loteProducto = detalleOrden?.loteEsperado || '';
      }
    }

    this.recalcularSubtotal();
  }

  onOrdenCompraChange(idOrden: number): void {
    this.ordenSeleccionada = this.ordenesCompra.find(o => o.idordenCompra === idOrden) || null;
  }

  recalcularSubtotal(): void {
    const cantidad = this.nuevoDetalle.cantidad || 0;
    const precio = this.nuevoDetalle.precioCompra || 0;
    this.nuevoDetalle.subtotal = +(cantidad * precio).toFixed(2);
  }

  get nuevoDetalleInvalido(): boolean {
    return (
      !this.nuevoDetalle.idProducto ||
      !this.nuevoDetalle.loteProducto ||
      !this.nuevoDetalle.fechaVencimiento ||
      !this.nuevoDetalle.cantidad ||
      this.nuevoDetalle.cantidad <= 0
    );
  }

  // — Confirmar / eliminar línea del detalle —

  agregarDetalle(): void {
    if (this.nuevoDetalleInvalido) return;
    const fecha = new Date(this.nuevoDetalle.fechaVencimiento);
    if (isNaN(fecha.getTime())) return;

    const producto = this.productosDelProveedor.find(
      p => p.idproducto === this.nuevoDetalle.idProducto
    );

    const detalle = new DetalleEntrada({
      ...new DetalleEntrada(),
      idProducto: this.nuevoDetalle.idProducto,
      nombreProducto: producto?.nombre ?? '',
      loteProducto: this.nuevoDetalle.loteProducto,
      fechaVencimiento: fecha,
      cantidad: this.nuevoDetalle.cantidad,
      precioUnitario: this.nuevoDetalle.precioCompra,
      subtotal: this.nuevoDetalle.subtotal
    });

    if (this.detalleEditandoIndex !== null) {
      this.detalles[this.detalleEditandoIndex] = detalle;
    } else {
      this.detalles.push(detalle);
    }

    this.detalleEditandoIndex = null;
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

  get totalIngresoDetalle(): number {
    return this.detalles.reduce((sum, d) => sum + d.subtotal, 0);
  }

  Regresar(): void {
    this.router.navigate(['/ingresos']);
  }

  private validarCamposObligatorios(): string[] {
    const errores: string[] = [];

    if (!this.docEntrada.idProveedor) errores.push('Proveedor');
    if (!this.docEntrada.idTipoDocEntrada) errores.push('Tipo de ingreso');
    if (!this.docEntrada.fechaIngreso) errores.push('Fecha de ingreso');
    if (!this.docEntrada.idMetodoPago) errores.push('Método de pago');
    if (!this.docEntrada.idEstadoPago) errores.push('Estado de pago');
    if (!this.docEntrada.idEstadoIngreso) errores.push('Estado de ingreso');
    if (this.detalles.length === 0) errores.push('Debe agregar al menos un producto');

    return errores;
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

    this.docEntrada.precioTotal = this.totalIngresoDetalle;

    if (!this.modoEdicion && !this.docEntrada.idEmpleado) {
      this.mostrarAlerta(
        'No se pudo identificar al empleado',
        'Vuelve a iniciar sesión e inténtalo nuevamente.',
        'error'
      );
      return;
    }

    if (this.modoEdicion) {
      this.docEntradaService.actualizarIngreso(this.idDocEntrada!, this.docEntrada).subscribe({
        next: () => {
          this.mostrarAlerta('Ingreso actualizado', 'Los cambios se guardaron correctamente.', 'success');
        },
        error: (err) => {
          console.error(err);
          this.mostrarAlerta('Ocurrió un error', 'No se pudo actualizar el ingreso. Inténtalo de nuevo.', 'error');
        }
      });
      return;
    }

    // Modo "nuevo": primero el header, luego cada línea de detalle
    this.docEntradaService.crearIngreso(this.docEntrada).subscribe({
      next: (docCreado) => {

        if (this.detalles.length === 0) {
          this.mostrarAlerta('Ingreso registrado', 'El ingreso se registró correctamente.', 'success');
          return;
        }

        const peticionesDetalle = this.detalles.map(d => {
          d.idDocEntrada = docCreado.iddocentrada;
          return this.detalleEntradaService.crear(d);
        });

        forkJoin(peticionesDetalle).subscribe({
          next: () => {
            this.mostrarAlerta('Ingreso registrado', 'El ingreso y sus productos se guardaron correctamente.', 'success');
          },
          error: (err) => {
            console.error('Error al guardar el detalle', err);
            this.mostrarAlerta(
              'Ingreso creado con errores',
              'El ingreso se registró, pero hubo un problema al guardar algunos productos.',
              'error'
            );
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.mostrarAlerta('Ocurrió un error', 'No se pudo registrar el ingreso. Inténtalo de nuevo.', 'error');
      }
    });
  }

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
      this.router.navigate(['/ingresos']);
    }
  }
}
