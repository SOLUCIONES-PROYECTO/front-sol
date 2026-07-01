export class DetalleOrdenCompra {

  iddetalleOc: number;
  idProducto: number;
  nombreProducto: string;
  cantidadSolicitada: number;
  precioUnitario: number;
  subTotal: number;
  fechaVencimientoEsperada: string;
  loteEsperado: string;
  observaciones: string;

  constructor(detalle: Partial<DetalleOrdenCompra> = {}) {
    this.iddetalleOc              = detalle.iddetalleOc              ?? 0;
    this.idProducto               = detalle.idProducto               ?? 0;
    this.nombreProducto           = detalle.nombreProducto           ?? '';
    this.cantidadSolicitada       = detalle.cantidadSolicitada       ?? 1;
    this.precioUnitario           = detalle.precioUnitario           ?? 0;
    this.subTotal                 = detalle.subTotal                 ?? 0;
    this.fechaVencimientoEsperada = detalle.fechaVencimientoEsperada ?? '';
    this.loteEsperado             = detalle.loteEsperado             ?? '';
    this.observaciones            = detalle.observaciones            ?? '';
  }

  static fromJson(detalleOrdenCompra: unknown): DetalleOrdenCompra {
    const casted = detalleOrdenCompra as Record<string, unknown>;
    return new DetalleOrdenCompra({
      iddetalleOc:              casted['iddetalleOc']              as number,
      idProducto:               casted['idProducto']               as number,
      nombreProducto:           casted['nombreProducto']           as string,
      cantidadSolicitada:       casted['cantidadSolicitada']       as number,
      precioUnitario:           casted['precioUnitario']           as number,
      subTotal:                 casted['subTotal']                 as number,
      fechaVencimientoEsperada: casted['fechaVencimientoEsperada'] as string,
      loteEsperado:             casted['loteEsperado']             as string,
      observaciones:            casted['observaciones']            as string,
    });
  }

  static toJson(detalle: DetalleOrdenCompra): unknown {
    return {
      idProducto:               detalle.idProducto,
      cantidadSolicitada:       detalle.cantidadSolicitada,
      precioUnitario:           detalle.precioUnitario,
      fechaVencimientoEsperada: detalle.fechaVencimientoEsperada || null,
      loteEsperado:             detalle.loteEsperado             || null,
      observaciones:            detalle.observaciones            || null,
    };
  }
}