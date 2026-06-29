export class ProductoSinMovimiento {

  idProducto: number;
  nombreProducto: string;
  stockActual: number;
  stockMinimo: number;
  fechaUltimaVenta: string | null;

  constructor(productoSinMovimiento: Partial<ProductoSinMovimiento> = {}) {
    this.idProducto = productoSinMovimiento.idProducto ?? 0;
    this.nombreProducto = productoSinMovimiento.nombreProducto ?? '';
    this.stockActual = productoSinMovimiento.stockActual ?? 0;
    this.stockMinimo = productoSinMovimiento.stockMinimo ?? 0;
    this.fechaUltimaVenta = productoSinMovimiento.fechaUltimaVenta ?? null;
  }

  static fromJson(productoSinServicio: unknown): ProductoSinMovimiento {
    const casted = productoSinServicio as Record<string, unknown>;
    return new ProductoSinMovimiento({
      idProducto: casted['idProducto'] as number,
      nombreProducto: casted['nombreProducto'] as string,
      stockActual: casted['stockActual'] as number,
      stockMinimo: casted['stockMinimo'] as number,
      fechaUltimaVenta: casted['fechaUltimaVenta'] as string | null,
    });
  }
}