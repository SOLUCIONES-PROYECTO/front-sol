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

  static fromJson(docEntrada: unknown): DocEntrada {
  const casted = docEntrada as Record<string, unknown>;
  const fechaCompleta = casted['fechaIngreso'] as string;
  const soloFecha = fechaCompleta ? fechaCompleta.split('T')[0] : '';
  return new DocEntrada({

    iddocentrada: casted['iddocentrada'] as number,

    idTipoDocEntrada: casted['idTipoDocEntrada'] as number,
    idMetodoPago: casted['idMetodoPago'] as number,
    idEstadoPago: casted['idEstadoPago'] as number,
    idEstadoIngreso: casted['idEstadoIngreso'] as number,
    idEmpleado: casted['idEmpleado'] as number,
    idProveedor: casted['idProveedor'] as number,

    tipoDocEntrada: casted['tipoDocEntrada'] as string,
    metodoPago: casted['metodoPago'] as string,
    estadoPago: casted['estadoPago'] as string,
    estadoIngreso: casted['estadoIngreso'] as string,

    empleado: casted['empleado'] as string,
    proveedor: casted['proveedor'] as string,

    numeroDocumento: casted['numeroDocumento'] as string,
    fechaIngreso: soloFecha,
    incidencias: casted['incidencias'] as string,

    precioTotal: casted['precioTotal'] as number
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
      fechaIngreso: doc.fechaIngreso ? `${doc.fechaIngreso}T00:00:00` : null,
      incidencias: doc.incidencias,
      precioTotal: doc.precioTotal

    };

  }
}
