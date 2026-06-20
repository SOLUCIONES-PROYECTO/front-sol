export class DetalleMerma {

  idDetalleMerma: number;

  // Request
  idDetalleSalida: number;

  // Response
  idProducto: number;
  nombreProducto: string;
  numeroDocumentoSalida: string;

  // Merma
  motivoMerma: string;
  descripcion: string;

  constructor(detalleMerma: Partial<DetalleMerma> = {}) {

    this.idDetalleMerma =detalleMerma.idDetalleMerma ?? 0;
    this.idDetalleSalida =detalleMerma.idDetalleSalida ?? 0;
    this.idProducto =detalleMerma.idProducto ?? 0;
    this.nombreProducto =detalleMerma.nombreProducto ?? '';
    this.numeroDocumentoSalida =detalleMerma.numeroDocumentoSalida ?? '';
    this.motivoMerma =detalleMerma.motivoMerma ?? '';
    this.descripcion =detalleMerma.descripcion ?? '';
  }

  static fromJson(detalleMerma: unknown): DetalleMerma {
    const casted = detalleMerma as Record<string, unknown>;
    return new DetalleMerma({
      idDetalleMerma:casted['idDetalleMerma'] as number,
      idDetalleSalida:casted['idDetalleSalida'] as number,
      idProducto:casted['idProducto'] as number,
      nombreProducto:casted['nombreProducto'] as string,
      numeroDocumentoSalida:casted['numeroDocumentoSalida'] as string,
      motivoMerma:casted['motivoMerma'] as string,
      descripcion:casted['descripcion'] as string
    });

  }

  static toJson(detalleMerma: DetalleMerma): unknown {

    return {
      idDetalleSalida:detalleMerma.idDetalleSalida,
      motivoMerma:detalleMerma.motivoMerma,
      descripcion:detalleMerma.descripcion
    };

  }

}