export class ProductoVencimiento {

  idProducto: number;
  nombreProducto: string;
  categoria: string;
  stockActual: number;
  fechaVencimiento: string;
  diasRestantes: number;
  urgencia: string; // 'VENCIDO' | 'URGENTE' | 'PROXIMO' | 'ADVERTENCIA'

  constructor(data: Partial<ProductoVencimiento> = {}) {
    this.idProducto = data.idProducto ?? 0;
    this.nombreProducto = data.nombreProducto ?? '';
    this.categoria = data.categoria ?? '';
    this.stockActual = data.stockActual ?? 0;
    this.fechaVencimiento = data.fechaVencimiento ?? '';
    this.diasRestantes = data.diasRestantes ?? 0;
    this.urgencia = data.urgencia ?? '';
  }

  static fromJson(data: unknown): ProductoVencimiento {
    const c = data as Record<string, unknown>;
    return new ProductoVencimiento({
      idProducto: c['idProducto'] as number,
      nombreProducto: c['nombreProducto'] as string,
      categoria: c['categoria'] as string,
      stockActual: c['stockActual'] as number,
      fechaVencimiento: c['fechaVencimiento'] as string,
      diasRestantes: c['diasRestantes'] as number,
      urgencia: c['urgencia'] as string,
    });
  }
}