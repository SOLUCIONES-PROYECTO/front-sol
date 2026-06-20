export class TipoDocEntrada {

  idTipoDocEntrada: number;
  nombre: string;
  descripcion: string;

  constructor(tipoDocEntrada: Partial<TipoDocEntrada> = {}) {
    this.idTipoDocEntrada = tipoDocEntrada.idTipoDocEntrada ?? 0;
    this.nombre = tipoDocEntrada.nombre ?? '';
    this.descripcion=tipoDocEntrada.descripcion ?? '';
  }

  static fromJson(tipoDocEntrada: unknown): TipoDocEntrada {
    const casted = tipoDocEntrada as Record<string, unknown>;
    return new TipoDocEntrada({
      idTipoDocEntrada: casted['idTipoDocEntrada'] as number,
      nombre: casted['nombre'] as string,
      descripcion: casted['descripcion'] as string
    });
  }

  static toJson(tipoDocEntrada: TipoDocEntrada): unknown {
    return {
      nombre: tipoDocEntrada.nombre
    };

  }

}