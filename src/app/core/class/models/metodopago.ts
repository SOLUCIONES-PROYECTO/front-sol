export class MetodoPago {

  idMetodoPago: number;
  nombre: string;

  constructor(metodoPago: Partial<MetodoPago> = {}) {
    this.idMetodoPago = metodoPago.idMetodoPago ?? 0;
    this.nombre = metodoPago.nombre ?? '';
  }

  static fromJson(metodoPago: unknown): MetodoPago {
    const casted = metodoPago as Record<string, unknown>;
    return new MetodoPago({
      idMetodoPago: casted['idMetodoPago'] as number,
      nombre: casted['nombre'] as string
    });
  }

  static toJson(metodoPago: MetodoPago): unknown {
    return {
      nombre: metodoPago.nombre
    };

  }

}