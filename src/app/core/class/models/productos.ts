export class Producto {

  idproducto: number;

  nombre: string;
  descripcion: string;
  categoria: string;

  // Para Request
  idProveedor: number;
  idEstado: number;
  idUnidadMedida: number;

  // Para Response
  proveedor: string;
  estado: string;
  unidadMedida: string;

  precioCompra: number;
  precioVenta: number;

  stockMinimo: number;
  stockActual: number;

  imagen: string;

  margen: number;
  ganancia: number;

  constructor(producto: Partial<Producto> = {}) {

    this.idproducto = producto.idproducto ?? 0;

    this.nombre = producto.nombre ?? '';
    this.descripcion = producto.descripcion ?? '';
    this.categoria = producto.categoria ?? '';

    this.idProveedor = producto.idProveedor ?? 0;
    this.idEstado = producto.idEstado ?? 0;
    this.idUnidadMedida = producto.idUnidadMedida ?? 0;

    this.proveedor = producto.proveedor ?? '';
    this.estado = producto.estado ?? '';
    this.unidadMedida = producto.unidadMedida ?? '';

    this.precioCompra = producto.precioCompra ?? 0;
    this.precioVenta = producto.precioVenta ?? 0;

    this.stockMinimo = producto.stockMinimo ?? 0;
    this.stockActual = producto.stockActual ?? 0;

    this.imagen = producto.imagen ?? '';

    this.margen = producto.margen ?? 0;
    this.ganancia = producto.ganancia ?? 0;
  }

  static fromJson(producto: unknown): Producto {

  const casted = producto as Record<string, unknown>;

  return new Producto({

    idproducto: casted['idproducto'] as number,

    nombre: casted['nombre'] as string,
    descripcion: casted['descripcion'] as string,
    categoria: casted['categoria'] as string,

    proveedor: casted['proveedor'] as string,
    idProveedor: casted['idProveedor'] as number,         // 👈 nuevo

    estado: casted['estado'] as string,
    idEstado: casted['idEstado'] as number,                // 👈 nuevo

    unidadMedida: casted['unidadMedida'] as string,
    idUnidadMedida: casted['idUnidadMedida'] as number,    // 👈 nuevo

    precioCompra: casted['precioCompra'] as number,
    precioVenta: casted['precioVenta'] as number,

    stockMinimo: casted['stockMinimo'] as number,
    stockActual: casted['stockActual'] as number,

    imagen: casted['imagen'] as string,

    margen: casted['margen'] as number,
    ganancia: casted['ganancia'] as number
  });

}

static toJson(producto: Producto): unknown {

  return {

    nombre: producto.nombre,
    descripcion: producto.descripcion,
    categoria: producto.categoria,

    idProveedor: producto.idProveedor,

    precioCompra: producto.precioCompra,
    precioVenta: producto.precioVenta,

    stockMinimo: producto.stockMinimo,
    stockActual: producto.stockActual,

    idEstado: producto.idEstado,

    idUnidadMedida: producto.idUnidadMedida,

    imagen: producto.imagen,

    margen: producto.margen,
    ganancia: producto.ganancia

  };

}

}