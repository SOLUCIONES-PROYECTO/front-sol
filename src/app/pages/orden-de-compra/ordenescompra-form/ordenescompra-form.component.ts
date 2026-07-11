import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { OrdenCompra } from '../../../core/class/models/ordencompra';
import { DetalleOrdenCompra } from '../../../core/class/models/detalleordencompra';
import { Proveedor } from '../../../core/class/models/proveedores';
import { Producto } from '../../../core/class/models/productos';
import { MetodoPago } from '../../../core/class/models/metodopago';
import { Empleado } from '../../../core/class/models/empleado';
import { EstadoOrdenCompra } from '../../../core/class/models/estadoordencompra';

import { OrdenCompraService } from '../../../core/services/ordenCompra.service';
import { ProveedorService } from '../../../core/services/proveedores.service';
import { ProductoService } from '../../../core/services/producto.service';
import { MetodoPagoService } from '../../../core/services/metodoPago.service';
import { EmpleadoService } from '../../../core/services/empleado.service';
import { EstadoOrdenCompraService } from '../../../core/services/estadoOrdenCompra.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-ordenes-compra-form',
  standalone: false,
  templateUrl: './ordenescompra-form.component.html',
  styleUrl: './ordenescompra-form.component.css',
})
export class OrdenesCompraFormComponent implements OnInit {

  ordenCompra: OrdenCompra = new OrdenCompra();

  modoEdicion = false;
  modoVista = false;
  idOrdenCompra: number | null = null;

  proveedores: Proveedor[] = [];
  metodosPago: MetodoPago[] = [];
  estadosOc: EstadoOrdenCompra[] = [];
  productosDisponibles: Producto[] = [];
  empleados: Empleado[] = [];
  empleadoLogueado: Empleado | undefined;

  detalles: DetalleOrdenCompra[] = [];
  showModalProducto = false;
  showAlertModal = false;
  alertTitle = '';
  alertMessage = '';
  alertType: 'error' | 'success' = 'error';

  nuevoDetalle = {
    categoria: '',
    idProducto: 0,
    nombreProducto: '',
    unidadMedida: '',
    precioUnitario: 0,
    cantidadSolicitada: 0,
    subTotal: 0,
    fechaVencimientoEsperada: '',
    loteEsperado: '',
    observaciones: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordenCompraService: OrdenCompraService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private metodoPagoService: MetodoPagoService,
    private empleadoService: EmpleadoService,
    private estadoOcService: EstadoOrdenCompraService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const modo = this.route.snapshot.data['modo'] || 'nuevo';
    this.modoEdicion = modo === 'editar';
    this.modoVista   = modo === 'ver';

    const idParam = this.route.snapshot.paramMap.get('id');
    this.idOrdenCompra = idParam ? Number(idParam) : null;

    forkJoin({
      proveedores: this.proveedorService.listarProveedor(),
      productos:   this.productoService.listarProductos(),
      metodosPago: this.metodoPagoService.listar(),
      estadosOc:   this.estadoOcService.listar(),
      empleados:   this.empleadoService.listar(),
    }).subscribe({
      next: (res) => {
        this.proveedores         = res.proveedores;
        this.productosDisponibles = res.productos;
        this.metodosPago         = res.metodosPago;
        this.estadosOc           = res.estadosOc;
        this.empleados           = res.empleados;

        this.empleadoLogueado = this.empleados.find(
          e => e.usuarioSistema === this.authService.getUsuarioSistema()
        );

        if (!this.modoEdicion && !this.modoVista && this.empleadoLogueado) {
          this.ordenCompra.idEmpleado = this.empleadoLogueado.idEmpleado;
        }

        this.cdr.detectChanges();

        if (this.idOrdenCompra) {
          this.cargarOrdenCompra(this.idOrdenCompra);
        }
      },
      error: (err) => console.error(err)
    });
  }

  get tituloFormulario(): string {
    if (this.modoVista)   return 'Detalle de Orden de Compra';
    if (this.modoEdicion) return 'Editar Orden de Compra';
    return 'Nueva Orden de Compra';
  }

  get empleadoMostrado(): Empleado | undefined {
    if (this.modoEdicion || this.modoVista) {
      return this.empleados.find(e => e.idEmpleado === this.ordenCompra.idEmpleado);
    }
    return this.empleadoLogueado;
  }

  cargarOrdenCompra(id: number): void {
    this.ordenCompraService.buscar(id).subscribe({
      next: (data) => {
        this.ordenCompra = data;
        this.detalles    = [...data.detalles];
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  get soloLecturaDetalle(): boolean {
    return this.modoVista || this.modoEdicion;
  }

  get productosDelProveedor(): Producto[] {
    if (!this.ordenCompra.idProveedor) return [];
    return this.productosDisponibles.filter(
      p => p.idProveedor === this.ordenCompra.idProveedor
    );
  }

  get categoriasDelProveedor(): string[] {
    const cats = this.productosDelProveedor.map(p => p.categoria);
    return [...new Set(cats)];
  }

  get lotePreview(): string {
  if (!this.ordenCompra.numeroOrden) return 'LOT-' + new Date().getFullYear() + '-XXXX';
  return this.ordenCompra.numeroOrden.replace('OC-', 'LOT-');
  }

  get productosFiltradosPorCategoria(): Producto[] {
    if (!this.nuevoDetalle.categoria) return [];
    return this.productosDelProveedor.filter(
      p => p.categoria === this.nuevoDetalle.categoria
    );
  }

  abrirModalProducto(): void {
    if (!this.ordenCompra.idProveedor) {
      alert('Selecciona un proveedor antes de agregar productos.');
      return;
    }

    if (this.productosDelProveedor.length === 0) {
      alert('Este proveedor no tiene productos registrados.');
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
      categoria: '',
      idProducto: 0,
      nombreProducto: '',
      unidadMedida: '',
      precioUnitario: 0,
      cantidadSolicitada: 0,
      subTotal: 0,
      fechaVencimientoEsperada: '',
      loteEsperado: '',
      observaciones: '',
    };
  }

  onCategoriaChange(): void {
    this.nuevoDetalle.idProducto   = 0;
    this.nuevoDetalle.nombreProducto = '';
    this.nuevoDetalle.unidadMedida = '';
    this.nuevoDetalle.precioUnitario = 0;
    this.recalcularSubtotal();
  }

  onProductoChange(): void {
    const producto = this.productosDelProveedor.find(
      p => p.idproducto === this.nuevoDetalle.idProducto
    );

    if (producto) {
      this.nuevoDetalle.nombreProducto = producto.nombre;
      this.nuevoDetalle.unidadMedida   = producto.unidadMedida;
      this.nuevoDetalle.precioUnitario  = producto.precioCompra;
    }

    this.recalcularSubtotal();
  }

  recalcularSubtotal(): void {
    const cantidad = this.nuevoDetalle.cantidadSolicitada || 0;
    const precio   = this.nuevoDetalle.precioUnitario     || 0;
    this.nuevoDetalle.subTotal = +(cantidad * precio).toFixed(2);
  }

  get nuevoDetalleInvalido(): boolean {
    return (
      !this.nuevoDetalle.idProducto ||
      !this.nuevoDetalle.cantidadSolicitada ||
      this.nuevoDetalle.cantidadSolicitada <= 0
    );
  }

  agregarDetalle(): void {
    if (this.nuevoDetalleInvalido) return;

    const detalle = new DetalleOrdenCompra({
      idProducto:               this.nuevoDetalle.idProducto,
      nombreProducto:           this.nuevoDetalle.nombreProducto,
      cantidadSolicitada:       this.nuevoDetalle.cantidadSolicitada,
      precioUnitario:           this.nuevoDetalle.precioUnitario,
      subTotal:                 this.nuevoDetalle.subTotal,
      fechaVencimientoEsperada: this.nuevoDetalle.fechaVencimientoEsperada,
      loteEsperado:             this.nuevoDetalle.loteEsperado,
      observaciones:            this.nuevoDetalle.observaciones,
    });

    this.detalles.push(detalle);
    this.showModalProducto = false;
    this.cdr.detectChanges();
  }

  eliminarDetalle(index: number): void {
    this.detalles.splice(index, 1);
    this.cdr.detectChanges();
  }

  get totalProductosDetalle(): number {
    return this.detalles.length;
  }

  get totalUnidadesDetalle(): number {
    return this.detalles.reduce((sum, d) => sum + d.cantidadSolicitada, 0);
  }

  get subtotalDetalle(): number {
    return this.detalles.reduce((sum, d) => sum + d.subTotal, 0);
  }

  get igvDetalle(): number {
    return +(this.subtotalDetalle * 0.18).toFixed(2);
  }

  get totalDetalle(): number {
    return +(this.subtotalDetalle + this.igvDetalle).toFixed(2);
  }

  Regresar(): void {
    this.router.navigate(['/orden-de-compra']);
  }

  private validarCamposObligatorios(): string[] {
    const errores: string[] = [];

    if (!this.ordenCompra.idProveedor || this.ordenCompra.idProveedor === 0) errores.push('Proveedor');
    if (!this.ordenCompra.idMetodoPago || this.ordenCompra.idMetodoPago === 0) errores.push('Método de pago');
    if (!this.ordenCompra.fechaEmision) errores.push('Fecha de emisión');
    if (!this.ordenCompra.fechaEntregaEsperada) errores.push('Fecha de entrega esperada');
    if (!this.ordenCompra.idEstadoOc || this.ordenCompra.idEstadoOc === 0) errores.push('Estado de la orden');
    if (this.detalles.length === 0) errores.push('Debe agregar al menos un producto');

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
      this.router.navigate(['/orden-de-compra']);
    }
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

    if (!this.modoEdicion && !this.ordenCompra.idEmpleado) {
      this.mostrarAlerta('No se pudo identificar al empleado', 'Vuelve a iniciar sesión e inténtalo nuevamente.', 'error');
      return;
    }

    this.ordenCompra.detalles = this.detalles;

    if (this.modoEdicion) {
      this.ordenCompraService.cambiarEstado(
        this.idOrdenCompra!,
        this.ordenCompra.idEstadoOc
      ).subscribe({
        next: () => {
          this.mostrarAlerta('Orden actualizada', 'Los cambios se guardaron correctamente.', 'success');
        },
        error: (err) => {
          console.error(err);
          this.mostrarAlerta('Ocurrió un error', 'No se pudo actualizar la orden. Inténtalo de nuevo.', 'error');
        }
      });

      return;
    }

    this.ordenCompraService.crear(this.ordenCompra).subscribe({
      next: () => {
        this.mostrarAlerta('Orden de compra registrada', 'La orden se registró correctamente.', 'success');
      },
      error: (err) => {
        console.error('Error al crear la orden', err);
        this.mostrarAlerta('Ocurrió un error', 'No se pudo registrar la orden. Inténtalo de nuevo.', 'error');
      }
    });
  }
}
