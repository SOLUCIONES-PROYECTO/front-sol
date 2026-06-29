export class ProductoMasVendido {

  idProducto: number;
  nombreProducto: string;
  cantidadVendida: number;

  constructor(productoMasVendido: Partial<ProductoMasVendido> = {}) {
    this.idProducto = productoMasVendido.idProducto ?? 0;
    this.nombreProducto = productoMasVendido.nombreProducto ?? '';
    this.cantidadVendida = productoMasVendido.cantidadVendida ?? 0;
  }

  static fromJson(productoMasVendido: unknown): ProductoMasVendido {
    const casted = productoMasVendido as Record<string, unknown>;
    return new ProductoMasVendido({
      idProducto: casted['idProducto'] as number,
      nombreProducto: casted['nombreProducto'] as string,
      cantidadVendida: casted['cantidadVendida'] as number,
    });
  }
}