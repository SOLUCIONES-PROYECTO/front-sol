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

@Component({
  selector: 'app-producto-form',
  standalone: false,
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css',
})
export class ProductoFormComponent implements OnInit {

  producto: Producto = new Producto();

  modoEdicion = false;
  modoVista = false;
  idProducto: number | null = null;

  proveedores: Proveedor[] = [];
  estados: EstadoProducto[] = [];
  unidadesMedida: UnidadMedida[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private estadoProductoService: EstadoProductoService,
    private unidadMedidaService: UnidadMedidaService,
    private cdr: ChangeDetectorRef
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
  this.proveedorService.listarProveedores().subscribe({
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

  guardar(): void {
    const peticion = this.modoEdicion
      ? this.productoService.actualizarProducto(this.idProducto!, this.producto)
      : this.productoService.crearProducto(this.producto);

    peticion.subscribe({
      next: (resp) => {
        console.log(resp);
        alert(this.modoEdicion ? 'Producto actualizado' : 'Producto registrado');
        this.router.navigate(['/productos']);
      },
      error: (err) => console.error(err)
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