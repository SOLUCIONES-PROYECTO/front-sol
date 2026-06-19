export class UnidadMedida {

  idUnidadMedida: number;
  nombre: string;

  constructor(unidadMedida: Partial<UnidadMedida> = {}) {
    this.idUnidadMedida = unidadMedida.idUnidadMedida ?? 0;
    this.nombre = unidadMedida.nombre ?? '';
  }

  static fromJson(unidadMedida: unknown): UnidadMedida {
    const casted = unidadMedida as Record<string, unknown>;
    return new UnidadMedida({
      idUnidadMedida: casted['idUnidadMedida'] as number,
      nombre: casted['nombre'] as string
    });
  }

  static toJson(unidadMedida: UnidadMedida): unknown {
    return {
      nombre: unidadMedida.nombre
    };

  }

}