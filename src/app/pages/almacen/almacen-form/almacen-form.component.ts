import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Producto } from '../../../core/class/models/productos';
import { DetalleEntrada } from '../../../core/class/models/detalleentrada';
import { ProductoService } from '../../../core/services/producto.service';
import { DetalleEntradaService } from '../../../core/services/detalleEntrada.service';

@Component({
  selector: 'app-almacen-form',
  standalone: false,
  templateUrl: './almacen-form.component.html',
  styleUrl: './almacen-form.component.css',
})
export class AlmacenFormComponent implements OnInit {

  producto: Producto = new Producto();
  idProducto: number | null = null;

  fechaVencimientoMasProxima: Date | null = null;
  lotesDelProducto: DetalleEntrada[] = [];
  loteSeleccionado: DetalleEntrada | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private detalleEntradaService: DetalleEntradaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.idProducto = idParam ? Number(idParam) : null;

    if (this.idProducto) {
      this.cargarProducto(this.idProducto);
    }
  }

  cargarProducto(id: number): void {
    this.productoService.obtenerProducto(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.cdr.detectChanges();
        this.cargarLotes(id);
      },
      error: (err) => console.error(err)
    });
}

  cargarLotes(idProducto: number): void {
    this.detalleEntradaService.listar().subscribe({
      next: (todos) => {
        this.lotesDelProducto = todos
          .filter((detalle) => detalle.idProducto === idProducto)
          .sort((a, b) => {
            const fechaA = this.normalizarFecha(a.fechaVencimiento)?.getTime() ?? Number.MAX_SAFE_INTEGER;
            const fechaB = this.normalizarFecha(b.fechaVencimiento)?.getTime() ?? Number.MAX_SAFE_INTEGER;

            return fechaA - fechaB;
          });

        this.loteSeleccionado = this.lotesDelProducto[0] || null;
        this.fechaVencimientoMasProxima = this.obtenerFechaVencimiento(this.loteSeleccionado);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  private normalizarFecha(fecha: Date | string | null | undefined): Date | null {
    if (!fecha) {
      return null;
    }

    const fechaParseada = fecha instanceof Date ? fecha : new Date(fecha);

    return Number.isNaN(fechaParseada.getTime()) ? null : fechaParseada;
  }

  private obtenerFechaVencimiento(lote: DetalleEntrada | null): Date | null {
    if (!lote) {
      return null;
    }

    return this.normalizarFecha(lote.fechaVencimiento);
  }

  formatearFecha(fecha: Date | string | null | undefined): string {
    const fechaNormalizada = this.normalizarFecha(fecha);

    if (!fechaNormalizada) {
      return 'Sin fecha de vencimiento';
    }

    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(fechaNormalizada);
  }

  get fechaVencimientoFormateada(): string {
    return this.formatearFecha(this.fechaVencimientoMasProxima);
  }

  get disponibilidad(): string {
    if (this.producto.stockActual === 0) return 'Agotado';
    if (this.estaVencido) return 'Vencido';
    return 'Disponible';
  }

  get estaVencido(): boolean {
    if (!this.fechaVencimientoMasProxima) return false;
    return this.fechaVencimientoMasProxima < new Date();
  }

  cambiarLote(): void {
    if (!this.loteSeleccionado) {
      this.fechaVencimientoMasProxima = null;
      this.cdr.detectChanges();
      return;
    }

    this.fechaVencimientoMasProxima = this.obtenerFechaVencimiento(this.loteSeleccionado);
    this.cdr.detectChanges();
  }

  seleccionarLotePorValor(valor: string): void {
    if (!valor) {
      this.loteSeleccionado = null;
      this.cambiarLote();
      return;
    }

    this.loteSeleccionado = this.lotesDelProducto.find(
      (lote) => lote.idDetalleEntrada.toString() === valor
    ) ?? null;

    this.cambiarLote();
  }

  getValorLote(lote: DetalleEntrada): string {
    return lote.idDetalleEntrada?.toString() ?? '';
  }

  getEtiquetaLote(lote: DetalleEntrada): string {
    const codigo = lote.codigoLote || lote.loteProducto || 'Sin código de lote';
    return `${codigo} - ${this.formatearFecha(lote.fechaVencimiento)}`;
  }

  Regresar(): void {
    this.router.navigate(['/almacen']);
  }
}