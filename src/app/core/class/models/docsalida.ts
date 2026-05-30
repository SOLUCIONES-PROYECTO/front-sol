export class DocSalida {

  iddocsalida: number;

  tipodocsalida_idtipodocsalida: number;
  cliente_idcliente: number;
  empleado_idempleado: number;
  metododepago_idmetododepago: number;

  numeroDocumento: string;
  fechaRegistro: string;
  fechaEgreso: string;

  descripcion: string;
  totalSalida: number;

  constructor(docSalida: Partial<DocSalida> = {}) {

    this.iddocsalida = docSalida.iddocsalida || 0;

    this.tipodocsalida_idtipodocsalida =
      docSalida.tipodocsalida_idtipodocsalida || 0;

    this.cliente_idcliente =
      docSalida.cliente_idcliente || 0;

    this.empleado_idempleado =
      docSalida.empleado_idempleado || 0;

    this.metododepago_idmetododepago =
      docSalida.metododepago_idmetododepago || 0;

    this.numeroDocumento =
      docSalida.numeroDocumento || '';

    this.fechaRegistro =
      docSalida.fechaRegistro || '';

    this.fechaEgreso =
      docSalida.fechaEgreso || '';

    this.descripcion =
      docSalida.descripcion || '';

    this.totalSalida =
      docSalida.totalSalida || 0;
  }

  static fromJson(docSalida: unknown): DocSalida {

    const casted = docSalida as Record<string, unknown>;

    return new DocSalida({

      iddocsalida: casted['iddocsalida'] as number,

      tipodocsalida_idtipodocsalida:
        casted['tipodocsalida_idtipodocsalida'] as number,

      cliente_idcliente:
        casted['cliente_idcliente'] as number,

      empleado_idempleado:
        casted['empleado_idempleado'] as number,

      metododepago_idmetododepago:
        casted['metododepago_idmetododepago'] as number,

      numeroDocumento:
        casted['numeroDocumento'] as string,

      fechaRegistro:
        casted['fechaRegistro'] as string,

      fechaEgreso:
        casted['fechaEgreso'] as string,

      descripcion:
        casted['descripcion'] as string,

      totalSalida:
        casted['totalSalida'] as number,
    });
  }

  static toJson(docSalida: DocSalida): unknown {

    return {

      iddocsalida: docSalida.iddocsalida,

      tipodocsalida_idtipodocsalida:
        docSalida.tipodocsalida_idtipodocsalida,

      cliente_idcliente:
        docSalida.cliente_idcliente,

      empleado_idempleado:
        docSalida.empleado_idempleado,

      metododepago_idmetododepago:
        docSalida.metododepago_idmetododepago,

      numeroDocumento: docSalida.numeroDocumento,

      fechaRegistro: docSalida.fechaRegistro,

      fechaEgreso: docSalida.fechaEgreso,

      descripcion: docSalida.descripcion,

      totalSalida: docSalida.totalSalida,
    };
  }
}