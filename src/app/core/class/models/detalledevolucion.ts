//Todavia
export class DetalleDevolucion {
  idDetalleDevolucion: number;

  // Request
  idDetalleSalida: number;

  // Response
  idProducto: number;
  nombreProducto: string;

  idDocSalida: number;
  numeroDocumentoSalida: string;

  motivo: string;

  constructor(detalleDevolucion: Partial<DetalleDevolucion> = {}) {
    this.idDetalleDevolucion = detalleDevolucion.idDetalleDevolucion ?? 0;
    this.idDetalleSalida = detalleDevolucion.idDetalleSalida ?? 0;
    this.idProducto = detalleDevolucion.idProducto ?? 0;
    this.nombreProducto = detalleDevolucion.nombreProducto ?? '';
    this.idDocSalida = detalleDevolucion.idDocSalida ?? 0;
    this.numeroDocumentoSalida = detalleDevolucion.numeroDocumentoSalida ?? '';
    this.motivo = detalleDevolucion.motivo ?? '';
  }

  static fromJson(detalleDevolucion: unknown): DetalleDevolucion {
    const casted = detalleDevolucion as Record<string, unknown>;
    return new DetalleDevolucion({
      idDetalleDevolucion:casted['idDetalleDevolucion'] as number,
      idDetalleSalida:casted['idDetalleSalida'] as number,
      idProducto:casted['idProducto'] as number,
      nombreProducto:casted['nombreProducto'] as string,
      idDocSalida:casted['idDocSalida'] as number,
      numeroDocumentoSalida:casted['numeroDocumentoSalida'] as string,
      motivo:casted['motivo'] as string
    });
  }

  static toJson(detalleDevolucion: DetalleDevolucion): unknown {
    return {
      idDetalleSalida:detalleDevolucion.idDetalleSalida,
      motivo:detalleDevolucion.motivo
    };
  }
}