export class TendenciaProducto {

  idProducto: number;
  nombreProducto: string;
  cantidadMesActual: number;
  cantidadMesAnterior: number;
  tendencia: string;
  variacionPorcentual: number | null;

  constructor(tendenciaProducto: Partial<TendenciaProducto> = {}) {
    this.idProducto = tendenciaProducto.idProducto ?? 0;
    this.nombreProducto = tendenciaProducto.nombreProducto ?? '';
    this.cantidadMesActual = tendenciaProducto.cantidadMesActual ?? 0;
    this.cantidadMesAnterior = tendenciaProducto.cantidadMesAnterior ?? 0;
    this.tendencia = tendenciaProducto.tendencia ?? '';
    this.variacionPorcentual = tendenciaProducto.variacionPorcentual ?? null;
  }

  static fromJson(tendenciaProducto: unknown): TendenciaProducto {
    const casted = tendenciaProducto as Record<string, unknown>;
    return new TendenciaProducto({
      idProducto: casted['idProducto'] as number,
      nombreProducto: casted['nombreProducto'] as string,
      cantidadMesActual: casted['cantidadMesActual'] as number,
      cantidadMesAnterior: casted['cantidadMesAnterior'] as number,
      tendencia: casted['tendencia'] as string,
      variacionPorcentual: casted['variacionPorcentual'] as number | null,
    });
  }
}