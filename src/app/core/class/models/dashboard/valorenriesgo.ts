export class ValorEnRiesgo {

  valorVencidos: number;
  valorUrgente: number;
  valorProximo: number;
  valorAdvertencia: number;
  valorTotalEnRiesgo: number;

  constructor(data: Partial<ValorEnRiesgo> = {}) {
    this.valorVencidos = data.valorVencidos ?? 0;
    this.valorUrgente = data.valorUrgente ?? 0;
    this.valorProximo = data.valorProximo ?? 0;
    this.valorAdvertencia = data.valorAdvertencia ?? 0;
    this.valorTotalEnRiesgo = data.valorTotalEnRiesgo ?? 0;
  }

  static fromJson(data: unknown): ValorEnRiesgo {
    const c = data as Record<string, unknown>;
    return new ValorEnRiesgo({
      valorVencidos: c['valorVencidos'] as number,
      valorUrgente: c['valorUrgente'] as number,
      valorProximo: c['valorProximo'] as number,
      valorAdvertencia: c['valorAdvertencia'] as number,
      valorTotalEnRiesgo: c['valorTotalEnRiesgo'] as number,
    });
  }
}