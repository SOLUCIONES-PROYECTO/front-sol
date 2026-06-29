export class Cliente {

  idcliente: number;

  idPersona: number;

  nombre: string;
  apellido: string;

  codigoCliente: string;
  estado: string;
  tipoCliente: string;

  limiteCredito: number;

  observaciones: string;

  categoriaCliente: string;

  fechaUltimaCompra: string;

  frecuenciaCompra: string;

  constructor(cliente: Partial<Cliente> = {}) {

    this.idcliente = cliente.idcliente ?? 0;

    this.idPersona = cliente.idPersona ?? 0;

    this.nombre = cliente.nombre ?? '';
    this.apellido = cliente.apellido ?? '';

    this.codigoCliente = cliente.codigoCliente ?? '';
    this.estado = cliente.estado ?? '';
    this.tipoCliente = cliente.tipoCliente ?? '';

    this.limiteCredito = cliente.limiteCredito ?? 0;

    this.observaciones = cliente.observaciones ?? '';

    this.categoriaCliente = cliente.categoriaCliente ?? '';

    this.fechaUltimaCompra =
      cliente.fechaUltimaCompra ?? '';

    this.frecuenciaCompra =
      cliente.frecuenciaCompra ?? '';

  }

  static fromJson(cliente: unknown): Cliente {

    const casted = cliente as Record<string, unknown>;

    return new Cliente({

      idcliente: casted['idcliente'] as number,

      idPersona: casted['idPersona'] as number,

      nombre: casted['nombre'] as string,
      apellido: casted['apellido'] as string,

      codigoCliente: casted['codigoCliente'] as string,
      estado: casted['estado'] as string,
      tipoCliente: casted['tipoCliente'] as string,

      limiteCredito: casted['limiteCredito'] as number,

      observaciones: casted['observaciones'] as string,

      categoriaCliente: casted['categoriaCliente'] as string,

      fechaUltimaCompra:
        casted['fechaUltimaCompra'] as string,

      frecuenciaCompra:
        casted['frecuenciaCompra'] as string

    });

  }

  static toJson(cliente: Cliente): unknown {

    return {

      idPersona: cliente.idPersona,

      codigoCliente: cliente.codigoCliente,

      estado: cliente.estado,

      tipoCliente: cliente.tipoCliente,

      limiteCredito: cliente.limiteCredito,

      observaciones: cliente.observaciones,

      categoriaCliente: cliente.categoriaCliente,

      fechaUltimaCompra: cliente.fechaUltimaCompra,

      frecuenciaCompra: cliente.frecuenciaCompra

    };

  }

}