export class EstadoIngreso {

  idEstadoIngreso: number;
  nombre: string;

  constructor(estadoIngreso: Partial<EstadoIngreso> = {}) {
    this.idEstadoIngreso = estadoIngreso.idEstadoIngreso ?? 0;
    this.nombre = estadoIngreso.nombre ?? '';
  }

  static fromJson(estadoIngreso: unknown): EstadoIngreso {
    const casted = estadoIngreso as Record<string, unknown>;
    return new EstadoIngreso({
      idEstadoIngreso: casted['idEstadoIngreso'] as number,
      nombre: casted['nombre'] as string
    });
  }

  static toJson(estadoIngreso: EstadoIngreso): unknown {
    return {
      nombre: estadoIngreso.nombre
    };

  }

}