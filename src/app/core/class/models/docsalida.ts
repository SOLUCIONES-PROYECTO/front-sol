export class DocSalida {

  iddocsalida: number;

  // Request
  idTipoDocSalida: number;
  idEmpleado: number;
  idMetodoPago: number;
  idCliente: number;

  nombreCliente: string;
  apellidoCliente: string;
  dniCliente: string;

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
    this.idEmpleado = docSalida.idEmpleado ?? 0;
    this.idMetodoPago = docSalida.idMetodoPago ?? 0;
    this.idCliente = docSalida.idCliente ?? 0;

    this.nombreCliente = docSalida.nombreCliente ?? '';
    this.apellidoCliente = docSalida.apellidoCliente ?? '';
    this.dniCliente = docSalida.dniCliente ?? '';

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

  static fromJson(data: unknown): DocSalida {

    const d = data as Record<string, unknown>;

    return new DocSalida({

      iddocsalida: d['iddocsalida'] as number,

      idTipoDocSalida: d['idTipoDocSalida'] as number,
      idMetodoPago: d['idMetodoPago'] as number,
      idEmpleado: d['idEmpleado'] as number,
      idCliente: d['idCliente'] as number,

      tipoDocSalida: d['tipoDocSalida'] as string,
      cliente: d['cliente'] as string,
      empleado: d['empleado'] as string,
      metodoPago: d['metodoPago'] as string,

      numeroDocumento: d['numeroDocumento'] as string,
      fechaRegistro: d['fechaRegistro'] as string,
      fechaEgreso: d['fechaEgreso'] as string,
      descripcion: d['descripcion'] as string,
      totalSalida: d['totalSalida'] as number,
    });

}

  static toJson(docSalida: DocSalida): unknown {

    return {

      idTipoDocSalida: docSalida.idTipoDocSalida,
      idEmpleado: docSalida.idEmpleado,
      idMetodoPago: docSalida.idMetodoPago,

      nombreCliente: docSalida.nombreCliente,
      apellidoCliente: docSalida.apellidoCliente,
      dniCliente: docSalida.dniCliente,

      numeroDocumento: docSalida.numeroDocumento,
      fechaRegistro: docSalida.fechaRegistro,
      fechaEgreso: docSalida.fechaEgreso,
      descripcion: docSalida.descripcion,
      totalSalida: docSalida.totalSalida

    };

  }

}