export class AreaUsoInterno {

  idAreaUsoInterno: number;
  nombre: string;

  constructor(areaUsoInterno: Partial<AreaUsoInterno> = {}) {
    this.idAreaUsoInterno = areaUsoInterno.idAreaUsoInterno ?? 0;
    this.nombre = areaUsoInterno.nombre ?? '';
  }

  static fromJson(areaUsoInterno: unknown): AreaUsoInterno {
    const casted = areaUsoInterno as Record<string, unknown>;
    return new AreaUsoInterno({
      idAreaUsoInterno: casted['idAreaUsoInterno'] as number,
      nombre: casted['nombre'] as string
    });
  }

  static toJson(areaUsoInterno: AreaUsoInterno): unknown {
    return {
      nombre: areaUsoInterno.nombre
    };

  }

}