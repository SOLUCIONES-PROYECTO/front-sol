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
        this.lotesDelProducto = todos.filter(d => d.idProducto === idProducto);
        this.fechaVencimientoMasProxima = this.obtenerFechaMasProxima(this.lotesDelProducto);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  private obtenerFechaMasProxima(lotes: DetalleEntrada[]): Date | null {
    if (lotes.length === 0) return null;

    return lotes.reduce((masProxima, lote) =>
      lote.fechaVencimiento < masProxima ? lote.fechaVencimiento : masProxima,
      lotes[0].fechaVencimiento
    );
  }

  get fechaVencimientoFormateada(): string {
    if (!this.fechaVencimientoMasProxima) return 'Sin lotes registrados';

    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(this.fechaVencimientoMasProxima);
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

  Regresar(): void {
    this.router.navigate(['/almacen']);
  }
}