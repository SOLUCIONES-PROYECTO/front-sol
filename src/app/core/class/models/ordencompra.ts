import { DetalleOrdenCompra } from './detalleordencompra';
import { EstadoOrdenCompra }  from './estadoordencompra';

export class OrdenCompra {

  idordenCompra: number;
  numeroOrden: string;
  idEmpleado: number;
  nombreEmpleado: string;
  idProveedor: number;
  nombreProveedor: string;
  estadoOc: string;
idEstadoOc: number;
  idMetodoPago: number;
  metodoPago: string;
  condicionesPago: string;
  moneda: string;
  fechaEmision: string;
  fechaEntregaEsperada: string;
  subtotal: number;
  igv: number;
  total: number;
  observaciones: string;
  fechaRegistro: string;
  detalles: DetalleOrdenCompra[];

  constructor(o: Partial<OrdenCompra> = {}) {
    this.idordenCompra        = o.idordenCompra        ?? 0;
    this.numeroOrden          = o.numeroOrden          ?? '';
    this.idEmpleado           = o.idEmpleado           ?? 0;
    this.nombreEmpleado       = o.nombreEmpleado       ?? '';
    this.idProveedor          = o.idProveedor          ?? 0;
    this.nombreProveedor      = o.nombreProveedor      ?? '';
    this.idEstadoOc            = o.idEstadoOc             ?? 0;
    this.estadoOc             = o.estadoOc             ?? '';
    this.idMetodoPago         = o.idMetodoPago         ?? 0;
    this.metodoPago           = o.metodoPago           ?? '';
    this.condicionesPago      = o.condicionesPago      ?? '';
    this.moneda               = o.moneda               ?? 'PEN';
    this.fechaEmision         = o.fechaEmision         ?? '';
    this.fechaEntregaEsperada = o.fechaEntregaEsperada ?? '';
    this.subtotal             = o.subtotal             ?? 0;
    this.igv                  = o.igv                  ?? 0;
    this.total                = o.total                ?? 0;
    this.observaciones        = o.observaciones        ?? '';
    this.fechaRegistro        = o.fechaRegistro        ?? '';
    this.detalles             = o.detalles             ?? [];
  }

  static fromJson(ordenCompra: unknown): OrdenCompra {
    const casted = ordenCompra as Record<string, unknown>;
    return new OrdenCompra({
      idordenCompra:        casted['idordenCompra']        as number,
      numeroOrden:          casted['numeroOrden']          as string,
      idEmpleado:           casted['idEmpleado']           as number,
      nombreEmpleado:       casted['nombreEmpleado']       as string,
      idProveedor:          casted['idProveedor']          as number,
      nombreProveedor:      casted['nombreProveedor']      as string,
      idEstadoOc: casted['idEstadoOc'] as number,
estadoOc: casted['estadoOc'] as string,
      idMetodoPago:         casted['idMetodoPago']         as number,
      metodoPago:           casted['metodoPago']           as string,
      condicionesPago:      casted['condicionesPago']      as string,
      moneda:               casted['moneda']               as string,
      fechaEmision:         casted['fechaEmision']         as string,
      fechaEntregaEsperada: casted['fechaEntregaEsperada'] as string,
      subtotal:             casted['subtotal']             as number,
      igv:                  casted['igv']                  as number,
      total:                casted['total']                as number,
      observaciones:        casted['observaciones']        as string,
      fechaRegistro:        casted['fechaRegistro']        as string,
      detalles: Array.isArray(casted['detalles'])
        ? (casted['detalles'] as unknown[]).map(d => DetalleOrdenCompra.fromJson(d))
        : [],
    });
  }

  static toJson(orden: OrdenCompra): unknown {
    return {
      idEmpleado:           orden.idEmpleado,
      idProveedor:          orden.idProveedor,
      idMetodoPago:         orden.idMetodoPago,
      condicionesPago:      orden.condicionesPago,
      moneda:               orden.moneda,
      fechaEmision:         orden.fechaEmision,
      fechaEntregaEsperada: orden.fechaEntregaEsperada,
      observaciones:        orden.observaciones || null,
      detalles:             orden.detalles.map(d => DetalleOrdenCompra.toJson(d)),
    };
  }
}