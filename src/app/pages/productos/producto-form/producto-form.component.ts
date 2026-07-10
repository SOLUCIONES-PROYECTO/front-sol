import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Producto } from '../../../core/class/models/productos';
import { Proveedor } from '../../../core/class/models/proveedores';
import { EstadoProducto } from '../../../core/class/models/estadoproducto';
import { UnidadMedida } from '../../../core/class/models/unidadmedida';

import { ProductoService } from '../../../core/services/producto.service';
import { ProveedorService } from '../../../core/services/proveedores.service';
import { EstadoProductoService } from '../../../core/services/estadoProducto.service';
import { UnidadMedidaService } from '../../../core/services/unidadMedida.service';
import { CategoriaProductoService } from '../../../core/services/categoriaProducto.service';

@Component({
  selector: 'app-producto-form',
  standalone: false,
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css',
})
export class ProductoFormComponent implements OnInit {

  producto: Producto = new Producto();

  modoEdicion = false;
  errorNombreProducto = false;
  errorStockMinimo = false;
  errorPrecioCompra = false;
  errorPrecioVenta = false;
  modoVista = false;
  idProducto: number | null = null;

  showAlertModal = false;
  alertTitle = '';
  alertMessage = '';
  alertType: 'error' | 'success' = 'error';

  proveedores: Proveedor[] = [];
  estados: EstadoProducto[] = [];
  unidadesMedida: UnidadMedida[] = [];
  categorias: { idCategoria: number; nombre: string; descripcion: string }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private estadoProductoService: EstadoProductoService,
    private unidadMedidaService: UnidadMedidaService,
    private cdr: ChangeDetectorRef,
    private categoriaProductoService: CategoriaProductoService

  ) {}

  ngOnInit(): void {
    this.cargarListas();

    const modo = this.route.snapshot.data['modo'] || 'nuevo';
    this.modoEdicion = modo === 'editar';
    this.modoVista = modo === 'ver';

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.idProducto = Number(idParam);
      this.cargarProducto(this.idProducto);
    }
  }

  get tituloFormulario(): string {
    if (this.modoVista) return 'Detalle del Producto';
    if (this.modoEdicion) return 'Editar Producto';
    return 'Añadir Producto';
  }

  cargarListas(): void {

  this.categoriaProductoService.listar().subscribe({
  next: (data) => {
    this.categorias = data;
    this.cdr.detectChanges();
  },
  error: (err) => console.error(err)
});

  this.proveedorService.listarProveedor().subscribe({
    next: (data) => {
      this.proveedores = data;
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err)
  });

  this.estadoProductoService.listar().subscribe({
    next: (data) => {
      this.estados = data;
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err)
  });

  this.unidadMedidaService.listar().subscribe({
    next: (data) => {
      this.unidadesMedida = data;
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err)
  });
}

  cargarProducto(id: number): void {
    this.productoService.obtenerProducto(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.recalcularPrecios();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  Regresar(): void {
    this.router.navigate(['/productos']);
  }

  aplicarTexto(event: Event, campo: string, maxLength: number): void {
    const input = event.target as HTMLInputElement;
    const valorOriginal = input.value;
    const excede = valorOriginal.length > maxLength;
    const valor = valorOriginal.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s.,-]/g, '').slice(0, maxLength);
    input.value = valor;
    (this.producto as Record<string, any>)[campo] = valor;

    if (campo === 'nombre') {
      this.errorNombreProducto = excede;
    }
  }

  aplicarNumeros(event: Event, campo: string, maxLength: number, decimal = false): void {
    const input = event.target as HTMLInputElement;
    const valorOriginal = input.value;
    const excede = valorOriginal.length > maxLength;
    const patron = decimal ? /[^\d.]/g : /\D/g;
    const valor = valorOriginal.replace(patron, '').slice(0, maxLength);
    input.value = valor;
    (this.producto as Record<string, any>)[campo] = decimal ? Number(valor || 0) : Number(valor || 0);

    if (campo === 'stockMinimo') {
      this.errorStockMinimo = excede;
    } else if (campo === 'precioCompra') {
      this.errorPrecioCompra = excede;
    } else if (campo === 'precioVenta') {
      this.errorPrecioVenta = excede;
    }
  }

  private validarCamposObligatorios(): string[] {
    const errores: string[] = [];

    if (!this.producto.nombre?.trim()) errores.push('Nombre del producto');
    if (!this.producto.categoria) errores.push('Categoría');
    if (!this.producto.idUnidadMedida || this.producto.idUnidadMedida === 0) errores.push('Unidad de medida');
    if (!this.producto.idProveedor || this.producto.idProveedor === 0) errores.push('Proveedor');
    if (!this.producto.idEstado || this.producto.idEstado === 0) errores.push('Estado');
    if (this.producto.stockMinimo === undefined || this.producto.stockMinimo === null || this.producto.stockMinimo === 0) errores.push('Stock mínimo');
    if (this.producto.precioCompra === undefined || this.producto.precioCompra === null || this.producto.precioCompra === 0) errores.push('Precio de compra');
    if (this.producto.precioVenta === undefined || this.producto.precioVenta === null || this.producto.precioVenta === 0) errores.push('Precio de venta');

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
      this.router.navigate(['/productos']);
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

    const peticion = this.modoEdicion
      ? this.productoService.actualizarProducto(this.idProducto!, this.producto)
      : this.productoService.crearProducto(this.producto);

    peticion.subscribe({
      next: () => {
        this.mostrarAlerta(this.modoEdicion ? 'Producto actualizado' : 'Producto registrado', 'Los cambios se guardaron correctamente.', 'success');
      },
      error: (err) => {
        console.error(err);
        this.mostrarAlerta('Ocurrió un error', 'No se pudo guardar el producto. Inténtalo de nuevo.', 'error');
      }
    });
  }

  recalcularPrecios(): void {
  const compra = this.producto.precioCompra || 0;
  const venta = this.producto.precioVenta || 0;

  const ganancia = venta - compra;

  this.producto.ganancia = +ganancia.toFixed(2);
  this.producto.margen = compra > 0 ? +((ganancia / compra) * 100).toFixed(2) : 0;
}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Por favor selecciona un archivo de imagen válido.');
    return;
  }

  const tamañoMaximoMB = 2;
  if (file.size > tamañoMaximoMB * 1024 * 1024) {
    alert(`La imagen no debe superar los ${tamañoMaximoMB}MB.`);
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    this.producto.imagen = reader.result as string;
    this.cdr.detectChanges();
  };
  reader.readAsDataURL(file);
}
}
