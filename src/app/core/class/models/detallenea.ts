export class DetalleNea {

  idDetalleNea: number;

  // Detalle Entrada
  idDetalleEntrada: number;
  idProducto: number;
  nombreProducto: string;
  numeroDocumentoEntrada: string;

  // Proveedor
  idProveedor: number;
  nombreProveedor: string;

  // Datos NEA
  motivo: string;
  observaciones: string;

  constructor(data: Partial<DetalleNea> = {}) {
    this.idDetalleNea = data.idDetalleNea ?? 0;
    this.idDetalleEntrada = data.idDetalleEntrada ?? 0;
    this.idProducto = data.idProducto ?? 0;
    this.nombreProducto = data.nombreProducto ?? '';
    this.numeroDocumentoEntrada = data.numeroDocumentoEntrada ?? '';
    this.idProveedor = data.idProveedor ?? 0;
    this.nombreProveedor = data.nombreProveedor ?? '';
    this.motivo = data.motivo ?? '';
    this.observaciones = data.observaciones ?? '';
  }

  static fromJson(detalleNea: unknown): DetalleNea {
    const casted = detalleNea as Record<string, unknown>;
    return new DetalleNea({
      idDetalleNea: casted['idDetalleNea'] as number,
      idDetalleEntrada: casted['idDetalleEntrada'] as number,
      idProducto: casted['idProducto'] as number,
      nombreProducto: casted['nombreProducto'] as string,
      numeroDocumentoEntrada: casted['numeroDocumentoEntrada'] as string,
      idProveedor: casted['idProveedor'] as number,
      nombreProveedor: casted['nombreProveedor'] as string,
      motivo: casted['motivo'] as string,
      observaciones: casted['observaciones'] as string

    });
  }

  static toJson(detalleNea: DetalleNea): unknown {
    return {
      motivo:detalleNea.motivo,
      observaciones:detalleNea.observaciones,
      idDetalleEntrada:detalleNea.idDetalleEntrada,
      idProveedor:detalleNea.idProveedor,

    };

  }
}