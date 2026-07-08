export class Proveedor {

  idProveedor: number;
  idPersona: number;

  // Nombre de la empresa (viene de descripcion en BD)
  descripcion: string;
  ruc: string;

  codigoUbigeo: string;
  direccion: string;
  departamento: string;
  ciudad: string;
  distrito: string;
  codigoPostal: string;
  referenciaUbicacion: string;

  correoEmpresa: string;
  telefonoEmpresa: string;
  telefonoFijoEmpresa: string;
  paginaWeb: string;

  nombreSectorista: string;
  correoSectorista: string;
  celularSectorista: string;
  telefonoFijoSectorista: string;

  etiquetas: string;
  incidencias: string;
  condicionesPago: string;
  calificacion: string;
  fechaRegistro: string;

  constructor(proveedor: Partial<Proveedor> = {}) {
    this.idProveedor = proveedor.idProveedor ?? 0;
    this.idPersona = proveedor.idPersona ?? 0;

    this.descripcion = proveedor.descripcion ?? '';
    this.ruc = proveedor.ruc ?? '';

    this.codigoUbigeo = proveedor.codigoUbigeo ?? '';
    this.direccion = proveedor.direccion ?? '';
    this.departamento = proveedor.departamento ?? '';
    this.ciudad = proveedor.ciudad ?? '';
    this.distrito = proveedor.distrito ?? '';
    this.codigoPostal = proveedor.codigoPostal ?? '';
    this.referenciaUbicacion = proveedor.referenciaUbicacion ?? '';

    this.correoEmpresa = proveedor.correoEmpresa ?? '';
    this.telefonoEmpresa = proveedor.telefonoEmpresa ?? '';
    this.telefonoFijoEmpresa = proveedor.telefonoFijoEmpresa ?? '';
    this.paginaWeb = proveedor.paginaWeb ?? '';

    this.nombreSectorista = proveedor.nombreSectorista ?? '';
    this.correoSectorista = proveedor.correoSectorista ?? '';
    this.celularSectorista = proveedor.celularSectorista ?? '';
    this.telefonoFijoSectorista = proveedor.telefonoFijoSectorista ?? '';

    this.etiquetas = proveedor.etiquetas ?? '';
    this.incidencias = proveedor.incidencias ?? '';
    this.condicionesPago = proveedor.condicionesPago ?? '';
    this.calificacion = proveedor.calificacion ?? '';
    this.fechaRegistro = proveedor.fechaRegistro ?? '';
  }

  static fromJson(proveedor: unknown): Proveedor {
    const c = proveedor as Record<string, unknown>;

    return new Proveedor({
      idProveedor: c['idProveedor'] as number,
      idPersona: c['idPersona'] as number,

      descripcion: c['descripcion'] as string,
      ruc: c['ruc'] as string,  // 👈 backend envía 'ruc' minúscula

      codigoUbigeo: c['codigoUbigeo'] as string,
      direccion: c['direccion'] as string,
      departamento: c['departamento'] as string,
      ciudad: c['ciudad'] as string,
      distrito: c['distrito'] as string,
      codigoPostal: c['codigoPostal'] as string,
      referenciaUbicacion: c['referenciaUbicacion'] as string,

      correoEmpresa: c['correoEmpresa'] as string,
      telefonoEmpresa: c['telefonoEmpresa'] as string,
      telefonoFijoEmpresa: c['telefonoFijoEmpresa'] as string,
      paginaWeb: c['paginaWeb'] as string,

      nombreSectorista: c['nombreSectorista'] as string,
      correoSectorista: c['correoSectorista'] as string,
      celularSectorista: c['celularSectorista'] as string,
      telefonoFijoSectorista: c['telefonoFijoSectorista'] as string,

      etiquetas: c['etiquetas'] as string,
      incidencias: c['incidencias'] as string,
      condicionesPago: c['condicionesPago'] as string,
      calificacion: c['calificacion'] as string,
      fechaRegistro: c['fechaRegistro'] as string,
    });
  }

  static toJson(proveedor: Proveedor): unknown {
    return {
      ruc: proveedor.ruc,  // 👈 backend espera 'ruc' minúscula
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
      telefonoFijoEmpresa: proveedor.telefonoFijoEmpresa,
      paginaWeb: proveedor.paginaWeb,

      nombreSectorista: proveedor.nombreSectorista,
      correoSectorista: proveedor.correoSectorista,
      celularSectorista: proveedor.celularSectorista,
      telefonoFijoSectorista: proveedor.telefonoFijoSectorista,

      etiquetas: proveedor.etiquetas,
      incidencias: proveedor.incidencias,
      condicionesPago: proveedor.condicionesPago,
      calificacion: proveedor.calificacion,
      // idPersona no se envía — el backend lo resuelve solo con el centinela
    };
  }
}