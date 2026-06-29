export class GananciaMes {

  mes: string;
  ingresos: number;
  compras: number;
  ganancia: number;

  constructor(gananciaMes: Partial<GananciaMes> = {}) {
    this.mes = gananciaMes.mes ?? '';
    this.ingresos = gananciaMes.ingresos ?? 0;
    this.compras = gananciaMes.compras ?? 0;
    this.ganancia = gananciaMes.ganancia ?? 0;
  }

  static fromJson(gananciaMes: unknown): GananciaMes {
    const casted = gananciaMes as Record<string, unknown>;
    return new GananciaMes({
      mes: casted['mes'] as string,
      ingresos: casted['ingresos'] as number,
      compras: casted['compras'] as number,
      ganancia: casted['ganancia'] as number,
    });
  }
}