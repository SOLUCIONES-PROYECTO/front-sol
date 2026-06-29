export class DetalleUsoInterno {

  idDetalleUsoInterno: number;

  // Datos del movimiento base
  idDetalleSalida: number;
  idProducto: number;
  nombreProducto: string;
  numeroDocumentoSalida: string;

  // Proveedor
  idAreaUsoInterno: number;
  nombreAreaUsoInterno: string;

  // Datos del uso Interno
  descripcion: string;

  constructor(data: Partial<DetalleUsoInterno> = {}) {
    this.idDetalleUsoInterno = data.idDetalleUsoInterno ?? 0;
    this.idDetalleSalida = data.idDetalleSalida ?? 0;
    this.idProducto = data.idProducto ?? 0;
    this.nombreProducto = data.nombreProducto ?? '';
    this.numeroDocumentoSalida = data.numeroDocumentoSalida ?? '';
    this.idAreaUsoInterno = data.idAreaUsoInterno ?? 0;
    this.nombreAreaUsoInterno = data.nombreAreaUsoInterno ?? '';
    this.descripcion = data.descripcion ?? '';
  }

  static fromJson(detalleUsoInterno: unknown): DetalleUsoInterno {
    const casted = detalleUsoInterno as Record<string, unknown>;
    return new DetalleUsoInterno({
      idDetalleUsoInterno: casted['idDetalleUsoInterno'] as number,
      idDetalleSalida: casted['idDetalleSalida'] as number,
      idProducto: casted['idProducto'] as number,
      nombreProducto: casted['nombreProducto'] as string,
      numeroDocumentoSalida: casted['numeroDocumentoSalida'] as string,
      idAreaUsoInterno: casted['idAreaUsoInterno'] as number,
      nombreAreaUsoInterno: casted['nombreAreaUsoInterno'] as string,
      descripcion: casted['descripcion'] as string,
    });
  }

  static toJson(detalleUsoInterno: DetalleUsoInterno): unknown {
    return {
      descripcion:detalleUsoInterno.descripcion,
      idDetalleSalida:detalleUsoInterno.idDetalleSalida,
      idAreaUsoInterno:detalleUsoInterno.idAreaUsoInterno,

    };

  }
}