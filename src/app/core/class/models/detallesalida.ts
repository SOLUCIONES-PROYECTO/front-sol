export class DetalleSalida {

  idDetalleSalida: number;

  // Request
  idDocSalida: number;
  idProducto: number;

  // Response
  numeroDocumentoSalida: string;
  nombreProducto: string;

  cantidad: number;
  precioUnitario: number;
  subtotal: number;


  constructor(detalleSalida: Partial<DetalleSalida> = {}) {
    this.idDetalleSalida = detalleSalida.idDetalleSalida ?? 0;
    this.idDocSalida = detalleSalida.idDocSalida ?? 0;
    this.idProducto = detalleSalida.idProducto ?? 0;
    this.numeroDocumentoSalida = detalleSalida.numeroDocumentoSalida ?? '';
    this.nombreProducto = detalleSalida.nombreProducto ?? '';
    this.cantidad = detalleSalida.cantidad ?? 0;
    this.subtotal = detalleSalida.subtotal ?? 0;
    this.precioUnitario = detalleSalida.precioUnitario ?? 0;
  }

  static fromJson(detalleSalida: unknown): DetalleSalida {

  const casted = detalleSalida as Record<string, unknown>;

  return new DetalleSalida({
    idDetalleSalida: casted['idDetalleSalida'] as number,
    idDocSalida: casted['idDocSalida'] as number,
    idProducto: casted['idProducto'] as number,
    numeroDocumentoSalida: casted['numeroDocumentoSalida'] as string,
    nombreProducto: casted['nombreProducto'] as string,
    cantidad: casted['cantidad'] as number,
    subtotal: casted['subtotal'] as number,
    precioUnitario: casted['precioUnitario'] as number
  });

}

static toJson(detalleSalida: DetalleSalida): unknown {

  return {
    idDocSalida: detalleSalida.idDocSalida,
    idProducto: detalleSalida.idProducto,
    cantidad: detalleSalida.cantidad,
    subtotal: detalleSalida.subtotal,
    precioUnitario: detalleSalida.precioUnitario
  };

}

}