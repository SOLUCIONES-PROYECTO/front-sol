export class Proveedor {

  idProveedor: number;
  persona_idpersona: number;

  ruc: string;
  descripcion: string;
  codigoUbigeo: string;

  direccion: string;
  departamento: string;
  ciudad: string;
  distrito: string;
  codigoPostal: string;
  referenciaUbicacion: string;

  correoEmpresa: string;
  telefonoEmpresa: string;
  telefonofijoEmpresa: string;
  paginaWeb: string;

  nombreSectorista: string;
  correoSectorista: string;
  celularSectorista: string;
  telefijoSectorista: string;

  etiquetas: string;
  incidencias: string;

  fechaRegistro: string;
  calificacion: string;
  condicionesPago: string;

  constructor(proveedor: Partial<Proveedor> = {}) {

    this.idProveedor = proveedor.idProveedor || 0;
    this.persona_idpersona = proveedor.persona_idpersona || 0;

    this.ruc = proveedor.ruc || '';
    this.descripcion = proveedor.descripcion || '';
    this.codigoUbigeo = proveedor.codigoUbigeo || '';

    this.direccion = proveedor.direccion || '';
    this.departamento = proveedor.departamento || '';
    this.ciudad = proveedor.ciudad || '';
    this.distrito = proveedor.distrito || '';
    this.codigoPostal = proveedor.codigoPostal || '';
    this.referenciaUbicacion = proveedor.referenciaUbicacion || '';

    this.correoEmpresa = proveedor.correoEmpresa || '';
    this.telefonoEmpresa = proveedor.telefonoEmpresa || '';
    this.telefonofijoEmpresa = proveedor.telefonofijoEmpresa || '';
    this.paginaWeb = proveedor.paginaWeb || '';

    this.nombreSectorista = proveedor.nombreSectorista || '';
    this.correoSectorista = proveedor.correoSectorista || '';
    this.celularSectorista = proveedor.celularSectorista || '';
    this.telefijoSectorista = proveedor.telefijoSectorista || '';

    this.etiquetas = proveedor.etiquetas || '';
    this.incidencias = proveedor.incidencias || '';

    this.fechaRegistro = proveedor.fechaRegistro || '';
    this.calificacion = proveedor.calificacion || '';
    this.condicionesPago = proveedor.condicionesPago || '';
  }

  static fromJson(proveedor: unknown): Proveedor {

    const casted = proveedor as Record<string, unknown>;

    return new Proveedor({

      idProveedor: casted['idProveedor'] as number,
      persona_idpersona: casted['persona_idpersona'] as number,

      ruc: casted['ruc'] as string,
      descripcion: casted['descripcion'] as string,
      codigoUbigeo: casted['codigoUbigeo'] as string,

      direccion: casted['direccion'] as string,
      departamento: casted['departamento'] as string,
      ciudad: casted['ciudad'] as string,
      distrito: casted['distrito'] as string,
      codigoPostal: casted['codigoPostal'] as string,
      referenciaUbicacion: casted['referenciaUbicacion'] as string,

      correoEmpresa: casted['correoEmpresa'] as string,
      telefonoEmpresa: casted['telefonoEmpresa'] as string,
      telefonofijoEmpresa: casted['telefonofijoEmpresa'] as string,
      paginaWeb: casted['paginaWeb'] as string,

      nombreSectorista: casted['nombreSectorista'] as string,
      correoSectorista: casted['correoSectorista'] as string,
      celularSectorista: casted['celularSectorista'] as string,
      telefijoSectorista: casted['telefijoSectorista'] as string,

      etiquetas: casted['etiquetas'] as string,
      incidencias: casted['incidencias'] as string,

      fechaRegistro: casted['fechaRegistro'] as string,
      calificacion: casted['calificacion'] as string,
      condicionesPago: casted['condicionesPago'] as string,
    });
  }

  static toJson(proveedor: Proveedor): unknown {

    return {

      idProveedor: proveedor.idProveedor,
      persona_idpersona: proveedor.persona_idpersona,

      RUC: proveedor.ruc,
      descripcion: proveedor.descripcion,
      codigoUbigeo: proveedor.codigoUbigeo,

      direccion: proveedor.direccion,
      departamento: proveedor.departamento,
      ciudad: proveedor.ciudad,
      distrito: proveedor.distrito,
      codigoPostal: proveedor.codigoPostal,
      referenciaUbicacion: proveedor.referenciaUbicacion,

      correoEmpresa: proveedor.correoEmpresa,
      telefonoEmpresa: proveedor.telefonoEmpresa,
      telefonofijoEmpresa: proveedor.telefonofijoEmpresa,
      paginaWeb: proveedor.paginaWeb,

      nombreSectorista: proveedor.nombreSectorista,
      correoSectorista: proveedor.correoSectorista,
      celularSectorista: proveedor.celularSectorista,
      telefijoSectorista: proveedor.telefijoSectorista,

      etiquetas: proveedor.etiquetas,
      incidencias: proveedor.incidencias,

      fechaRegistro: proveedor.fechaRegistro,
      calificacion: proveedor.calificacion,
      condicionesPago: proveedor.condicionesPago,
    };
  }
}