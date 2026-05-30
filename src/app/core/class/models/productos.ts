export class Producto {

  idproducto: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  proveedor_idProveedor: number;
  precioCompra: number;
  precioVenta: number;
  stockMinimo: number;
  stockActual: number;
  imagen: string;
  margen: number;
  ganancia: number;
  estadoProducto_idEstadoProducto: number;
  unidadMedida_idUnidadMedida: number;

  constructor(producto: Partial<Producto> = {}) {

    this.idproducto = producto.idproducto || 0;
    this.nombre = producto.nombre || '';
    this.descripcion = producto.descripcion || '';
    this.categoria = producto.categoria || '';
    this.proveedor_idProveedor = producto.proveedor_idProveedor || 0;
    this.precioCompra = producto.precioCompra || 0;
    this.precioVenta = producto.precioVenta || 0;
    this.stockMinimo = producto.stockMinimo || 0;
    this.stockActual = producto.stockActual || 0;
    this.imagen = producto.imagen || '';
    this.margen = producto.margen || 0;
    this.ganancia = producto.ganancia || 0;
    this.estadoProducto_idEstadoProducto =
      producto.estadoProducto_idEstadoProducto || 0;
    this.unidadMedida_idUnidadMedida =
      producto.unidadMedida_idUnidadMedida || 0;
  }

  static fromJson(producto: unknown): Producto {

    const casted = producto as Record<string, unknown>;

    return new Producto({

      idproducto: casted['idproducto'] as number,

      nombre: casted['nombre'] as string,
      descripcion: casted['descripcion'] as string,
      categoria: casted['categoria'] as string,

      proveedor_idProveedor:
        casted['proveedor_idProveedor'] as number,

      precioCompra: casted['precioCompra'] as number,
      precioVenta: casted['precioVenta'] as number,

      stockMinimo: casted['stockMinimo'] as number,
      stockActual: casted['stockActual'] as number,

      imagen: casted['imagen'] as string,

      margen: casted['margen'] as number,
      ganancia: casted['ganancia'] as number,

      estadoProducto_idEstadoProducto:
        casted['estadoProducto_idEstadoProducto'] as number,

      unidadMedida_idUnidadMedida:
        casted['unidadMedida_idUnidadMedida'] as number,

    });

  }

  static toJson(producto: Producto): unknown {

    return {

      idproducto: producto.idproducto,

      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria: producto.categoria,

      proveedor_idProveedor:
        producto.proveedor_idProveedor,

      precioCompra: producto.precioCompra,
      precioVenta: producto.precioVenta,

      stockMinimo: producto.stockMinimo,
      stockActual: producto.stockActual,

      imagen: producto.imagen,

      margen: producto.margen,
      ganancia: producto.ganancia,

      estadoProducto_idEstadoProducto:
        producto.estadoProducto_idEstadoProducto,

      unidadMedida_idUnidadMedida:
        producto.unidadMedida_idUnidadMedida,

    };

  }

}