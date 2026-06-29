export class ResumenDashboard {

  ingresosTotales: number;
  comprasTotales: number;
  gananciaTotal: number;
  cantidadVentas: number;

  constructor(resumenDashboard: Partial<ResumenDashboard> = {}) {
    this.ingresosTotales = resumenDashboard.ingresosTotales ?? 0;
    this.comprasTotales = resumenDashboard.comprasTotales ?? 0;
    this.gananciaTotal = resumenDashboard.gananciaTotal ?? 0;
    this.cantidadVentas = resumenDashboard.cantidadVentas ?? 0;
  }

  static fromJson(resumenDashboard: unknown): ResumenDashboard {
    const casted = resumenDashboard as Record<string, unknown>;
    return new ResumenDashboard({
      ingresosTotales: casted['ingresosTotales'] as number,
      comprasTotales: casted['comprasTotales'] as number,
      gananciaTotal: casted['gananciaTotal'] as number,
      cantidadVentas: casted['cantidadVentas'] as number,
    });
  }
}