export class TipoDocSalida {

  idTipoDocSalida: number;
  nombre: string;
  descripcion: string;

  constructor(tipoDocSalida: Partial<TipoDocSalida> = {}) {
    this.idTipoDocSalida = tipoDocSalida.idTipoDocSalida ?? 0;
    this.nombre = tipoDocSalida.nombre ?? '';
    this.descripcion=tipoDocSalida.descripcion ?? '';
  }

  static fromJson(tipoDocSalida: unknown): TipoDocSalida {
    const casted = tipoDocSalida as Record<string, unknown>;
    return new TipoDocSalida({
      idTipoDocSalida: casted['idTipoDocSalida'] as number,
      nombre: casted['nombre'] as string,
      descripcion: casted['descripcion'] as string
    });
  }

  static toJson(tipoDocSalida: TipoDocSalida): unknown {
    return {
      nombre: tipoDocSalida.nombre
    };

  }

}