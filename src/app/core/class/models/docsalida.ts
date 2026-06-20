export class DocSalida {

  iddocsalida: number;

  // Request
  idTipoDocSalida: number;
  idCliente: number;
  idEmpleado: number;
  idMetodoPago: number;

  // Response
  tipoDocSalida: string;
  cliente: string;
  empleado: string;
  metodoPago: string;

  numeroDocumento: string;
  fechaRegistro: string;
  fechaEgreso: string;
  descripcion: string;
  totalSalida: number;

  constructor(docSalida: Partial<DocSalida> = {}) {

    this.iddocsalida = docSalida.iddocsalida ?? 0;

    this.idTipoDocSalida = docSalida.idTipoDocSalida ?? 0;
    this.idCliente = docSalida.idCliente ?? 0;
    this.idEmpleado = docSalida.idEmpleado ?? 0;
    this.idMetodoPago = docSalida.idMetodoPago ?? 0;

    this.tipoDocSalida = docSalida.tipoDocSalida ?? '';
    this.cliente = docSalida.cliente ?? '';
    this.empleado = docSalida.empleado ?? '';
    this.metodoPago = docSalida.metodoPago ?? '';

    this.numeroDocumento = docSalida.numeroDocumento ?? '';
    this.fechaRegistro = docSalida.fechaRegistro ?? '';
    this.fechaEgreso = docSalida.fechaEgreso ?? '';
    this.descripcion = docSalida.descripcion ?? '';
    this.totalSalida = docSalida.totalSalida ?? 0;
  }

  static fromJson(docSalida: unknown): DocSalida {

    const casted = docSalida as Record<string, unknown>;

    return new DocSalida({

      iddocsalida: casted['iddocsalida'] as number,

      tipoDocSalida: casted['tipoDocSalida'] as string,
      cliente: casted['cliente'] as string,
      empleado: casted['empleado'] as string,
      metodoPago: casted['metodoPago'] as string,

      numeroDocumento: casted['numeroDocumento'] as string,
      fechaRegistro: casted['fechaRegistro'] as string,
      fechaEgreso: casted['fechaEgreso'] as string,
      descripcion: casted['descripcion'] as string,
      totalSalida: casted['totalSalida'] as number,
    });

  }

  static toJson(docSalida: DocSalida): unknown {

    return {

      idTipoDocSalida: docSalida.idTipoDocSalida,
      idCliente: docSalida.idCliente,
      idEmpleado: docSalida.idEmpleado,
      idMetodoPago: docSalida.idMetodoPago,

      numeroDocumento: docSalida.numeroDocumento,
      fechaRegistro: docSalida.fechaRegistro,
      fechaEgreso: docSalida.fechaEgreso,
      descripcion: docSalida.descripcion,
      totalSalida: docSalida.totalSalida

    };

  }

}