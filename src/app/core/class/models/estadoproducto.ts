export class EstadoProducto {

  idEstadoProducto: number;
  nombre: string;

  constructor(estadoProducto: Partial<EstadoProducto> = {}) {
    this.idEstadoProducto = estadoProducto.idEstadoProducto ?? 0;
    this.nombre = estadoProducto.nombre ?? '';
  }

  static fromJson(estadoProducto: unknown): EstadoProducto {
    const casted = estadoProducto as Record<string, unknown>;
    return new EstadoProducto({
      idEstadoProducto: casted['idEstadoProducto'] as number,
      nombre: casted['nombre'] as string
    });
  }

  static toJson(estadoProducto: EstadoProducto): unknown {
    return {
      nombre: estadoProducto.nombre
    };
  }
}