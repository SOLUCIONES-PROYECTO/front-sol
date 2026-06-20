export class EstadoPago {

  idEstadoPago: number;
  nombre: string;

  constructor(estadoPago: Partial<EstadoPago> = {}) {
    this.idEstadoPago = estadoPago.idEstadoPago ?? 0;
    this.nombre = estadoPago.nombre ?? '';
  }

  static fromJson(estadoPago: unknown): EstadoPago {
    const casted = estadoPago as Record<string, unknown>;
    return new EstadoPago({
      idEstadoPago: casted['idEstadoPago'] as number,
      nombre: casted['nombre'] as string
    });
  }

  static toJson(estadoPago: EstadoPago): unknown {
    return {
      nombre: estadoPago.nombre
    };

  }

}