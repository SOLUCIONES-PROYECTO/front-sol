export class VentaMes {

  mes: string;
  total: number;

  constructor(ventaMes: Partial<VentaMes> = {}) {
    this.mes = ventaMes.mes ?? '';
    this.total = ventaMes.total ?? 0;
  }

  static fromJson(ventaMes: unknown): VentaMes {
    const casted = ventaMes as Record<string, unknown>;
    return new VentaMes({
      mes: casted['mes'] as string,
      total: casted['total'] as number,
    });
  }
}