export class DocEntrada {

  iddocentrada: number;

  tipodocentrada_idtipodocentrada: number;
  metododepago_idmetododepago: number;
  estadoPago_idestadoPago: number;
  estadoIngreso_idestadoIngreso: number;

  empleado_idempleado: number;
  proveedor_idProveedor: number;

  numeroDocumento: string;
  fecha_ingreso: string;
  incidencias: string;
  precioTotal: number;

  constructor(docEntrada: Partial<DocEntrada> = {}) {

    this.iddocentrada = docEntrada.iddocentrada || 0;

    this.tipodocentrada_idtipodocentrada =
      docEntrada.tipodocentrada_idtipodocentrada || 0;

    this.metododepago_idmetododepago =
      docEntrada.metododepago_idmetododepago || 0;

    this.estadoPago_idestadoPago =
      docEntrada.estadoPago_idestadoPago || 0;

    this.estadoIngreso_idestadoIngreso =
      docEntrada.estadoIngreso_idestadoIngreso || 0;

    this.empleado_idempleado =
      docEntrada.empleado_idempleado || 0;

    this.proveedor_idProveedor =
      docEntrada.proveedor_idProveedor || 0;

    this.numeroDocumento =
      docEntrada.numeroDocumento || '';

    this.fecha_ingreso =
      docEntrada.fecha_ingreso || '';

    this.incidencias =
      docEntrada.incidencias || '';

    this.precioTotal =
      docEntrada.precioTotal || 0;
  }

  static fromJson(docEntrada: unknown): DocEntrada {

    const casted = docEntrada as Record<string, unknown>;

    return new DocEntrada({

      iddocentrada:
        casted['iddocentrada'] as number,

      tipodocentrada_idtipodocentrada:
        casted['tipodocentrada_idtipodocentrada'] as number,

      metododepago_idmetododepago:
        casted['metododepago_idmetododepago'] as number,

      estadoPago_idestadoPago:
        casted['estadoPago_idestadoPago'] as number,

      estadoIngreso_idestadoIngreso:
        casted['estadoIngreso_idestadoIngreso'] as number,

      empleado_idempleado:
        casted['empleado_idempleado'] as number,

      proveedor_idProveedor:
        casted['proveedor_idProveedor'] as number,

      numeroDocumento:
        casted['numeroDocumento'] as string,

      fecha_ingreso:
        casted['fecha_ingreso'] as string,

      incidencias:
        casted['incidencias'] as string,

      precioTotal:
        casted['precioTotal'] as number,

    });

  }

  static toJson(docEntrada: DocEntrada): unknown {

    return {

      iddocentrada:
        docEntrada.iddocentrada,

      tipodocentrada_idtipodocentrada:
        docEntrada.tipodocentrada_idtipodocentrada,

      metododepago_idmetododepago:
        docEntrada.metododepago_idmetododepago,

      estadoPago_idestadoPago:
        docEntrada.estadoPago_idestadoPago,

      estadoIngreso_idestadoIngreso:
        docEntrada.estadoIngreso_idestadoIngreso,

      empleado_idempleado:
        docEntrada.empleado_idempleado,

      proveedor_idProveedor:
        docEntrada.proveedor_idProveedor,

      numeroDocumento:
        docEntrada.numeroDocumento,

      fecha_ingreso:
        docEntrada.fecha_ingreso,

      incidencias:
        docEntrada.incidencias,

      precioTotal:
        docEntrada.precioTotal,

    };

  }

}