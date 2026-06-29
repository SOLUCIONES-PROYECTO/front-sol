export class ProductoStockBajo {

  idProducto: number;
  nombreProducto: string;
  stockActual: number;
  stockMinimo: number;

  constructor(productoStockBajo: Partial<ProductoStockBajo> = {}) {
    this.idProducto = productoStockBajo.idProducto ?? 0;
    this.nombreProducto = productoStockBajo.nombreProducto ?? '';
    this.stockActual = productoStockBajo.stockActual ?? 0;
    this.stockMinimo = productoStockBajo.stockMinimo ?? 0;
  }

  static fromJson(productoStockBajo: unknown): ProductoStockBajo {
    const casted = productoStockBajo as Record<string, unknown>;
    return new ProductoStockBajo({
      idProducto: casted['idProducto'] as number,
      nombreProducto: casted['nombreProducto'] as string,
      stockActual: casted['stockActual'] as number,
      stockMinimo: casted['stockMinimo'] as number,
    });
  }
}