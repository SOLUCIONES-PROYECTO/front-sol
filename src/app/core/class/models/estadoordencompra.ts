export class EstadoOrdenCompra {

  idestadoOc: number;
  nombre: string;

  constructor(estado: Partial<EstadoOrdenCompra> = {}) {
    this.idestadoOc = estado.idestadoOc ?? 0;
    this.nombre     = estado.nombre     ?? '';
  }

  static fromJson(estadoOrdenCompra: unknown): EstadoOrdenCompra {
    const casted = estadoOrdenCompra as Record<string, unknown>;
    return new EstadoOrdenCompra({
      idestadoOc: casted['idestadoOc'] as number,
      nombre:     casted['nombre']     as string,
    });
  }

  static toJson(estado: EstadoOrdenCompra): unknown {
    return {
      nombre: estado.nombre,
    };
  }
}