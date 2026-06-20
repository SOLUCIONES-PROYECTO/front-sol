export class DetalleEntrada {

  idDetalleEntrada: number;

  // Request
  idDocEntrada: number;
  idProducto: number;

  // Response
  numeroDocumento: string;
  nombreProducto: string;

  cantidad: number;
  subtotal: number;

  loteProducto: string;
  fechaVencimiento: Date;

  precioUnitario: number;

  constructor(detalleEntrada: Partial<DetalleEntrada> = {}) {

    this.idDetalleEntrada = detalleEntrada.idDetalleEntrada ?? 0;

    this.idDocEntrada = detalleEntrada.idDocEntrada ?? 0;
    this.idProducto = detalleEntrada.idProducto ?? 0;

    this.numeroDocumento = detalleEntrada.numeroDocumento ?? '';
    this.nombreProducto = detalleEntrada.nombreProducto ?? '';

    this.cantidad = detalleEntrada.cantidad ?? 0;
    this.subtotal = detalleEntrada.subtotal ?? 0;

    this.loteProducto = detalleEntrada.loteProducto ?? '';

    this.fechaVencimiento =
      detalleEntrada.fechaVencimiento ?? new Date();

    this.precioUnitario = detalleEntrada.precioUnitario ?? 0;

  }

  static fromJson(detalleEntrada: unknown): DetalleEntrada {

    const casted = detalleEntrada as Record<string, unknown>;

    return new DetalleEntrada({

      idDetalleEntrada: casted['idDetalleEntrada'] as number,

      idDocEntrada: casted['idDocEntrada'] as number,
      idProducto: casted['idProducto'] as number,

      numeroDocumento: casted['numeroDocumento'] as string,
      nombreProducto: casted['nombreProducto'] as string,

      cantidad: casted['cantidad'] as number,
      subtotal: casted['subtotal'] as number,

      loteProducto: casted['loteProducto'] as string,

      fechaVencimiento: casted['fechaVencimiento']
        ? new Date(casted['fechaVencimiento'] as string)
        : new Date(),

      precioUnitario: casted['precioUnitario'] as number

    });

  }

  static toJson(detalleEntrada: DetalleEntrada): unknown {

    return {

      idDocEntrada: detalleEntrada.idDocEntrada,
      idProducto: detalleEntrada.idProducto,

      cantidad: detalleEntrada.cantidad,
      subtotal: detalleEntrada.subtotal,

      loteProducto: detalleEntrada.loteProducto,

      fechaVencimiento: detalleEntrada.fechaVencimiento
        .toISOString()
        .split('T')[0],

      precioUnitario: detalleEntrada.precioUnitario

    };

  }

}