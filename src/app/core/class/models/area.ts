export class Area {

  idArea: number;
  nombre: string;

  constructor(area: Partial<Area> = {}) {
    this.idArea = area.idArea ?? 0;
    this.nombre = area.nombre ?? '';
  }

  static fromJson(area: unknown): Area {
    const casted = area as Record<string, unknown>;
    return new Area({
      idArea: casted['idArea'] as number,
      nombre: casted['nombre'] as string
    });
  }

  static toJson(area: Area): unknown {
    return {
      nombre: area.nombre
    };

  }

}