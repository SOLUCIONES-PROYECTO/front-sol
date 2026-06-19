export class DocEntrada {

  iddocentrada: number;

  // Request
  idTipoDocEntrada: number;
  idMetodoPago: number;
  idEstadoPago: number;
  idEstadoIngreso: number;
  idEmpleado: number;
  idProveedor: number;

  // Response
  tipoDocEntrada: string;
  metodoPago: string;
  estadoPago: string;
  estadoIngreso: string;
  empleado: string;
  proveedor: string;

  numeroDocumento: string;
  fechaIngreso: string;
  incidencias: string;
  precioTotal: number;

  constructor(doc: Partial<DocEntrada> = {}) {

    this.iddocentrada = doc.iddocentrada ?? 0;

    this.idTipoDocEntrada = doc.idTipoDocEntrada ?? 0;
    this.idMetodoPago = doc.idMetodoPago ?? 0;
    this.idEstadoPago = doc.idEstadoPago ?? 0;
    this.idEstadoIngreso = doc.idEstadoIngreso ?? 0;
    this.idEmpleado = doc.idEmpleado ?? 0;
    this.idProveedor = doc.idProveedor ?? 0;

    this.tipoDocEntrada = doc.tipoDocEntrada ?? '';
    this.metodoPago = doc.metodoPago ?? '';
    this.estadoPago = doc.estadoPago ?? '';
    this.estadoIngreso = doc.estadoIngreso ?? '';
    this.empleado = doc.empleado ?? '';
    this.proveedor = doc.proveedor ?? '';

    this.numeroDocumento = doc.numeroDocumento ?? '';
    this.fechaIngreso = doc.fechaIngreso ?? '';
    this.incidencias = doc.incidencias ?? '';
    this.precioTotal = doc.precioTotal ?? 0;
  }

  static fromJson(data: unknown): DocEntrada {

    const d = data as Record<string, unknown>;

    return new DocEntrada({

      iddocentrada: d['iddocentrada'] as number,

      tipoDocEntrada: d['tipoDocEntrada'] as string,
      metodoPago: d['metodoPago'] as string,
      estadoPago: d['estadoPago'] as string,
      estadoIngreso: d['estadoIngreso'] as string,

      empleado: d['empleado'] as string,
      proveedor: d['proveedor'] as string,

      numeroDocumento: d['numeroDocumento'] as string,
      fechaIngreso: d['fechaIngreso'] as string,
      incidencias: d['incidencias'] as string,

      precioTotal: d['precioTotal'] as number
    });

  }
  static toJson(doc: DocEntrada): unknown {

    return {

      idTipoDocEntrada: doc.idTipoDocEntrada,
      idMetodoPago: doc.idMetodoPago,
      idEstadoPago: doc.idEstadoPago,
      idEstadoIngreso: doc.idEstadoIngreso,
      idEmpleado: doc.idEmpleado,
      idProveedor: doc.idProveedor,

      numeroDocumento: doc.numeroDocumento,
      fechaIngreso: doc.fechaIngreso,
      incidencias: doc.incidencias,
      precioTotal: doc.precioTotal

    };

  }
}