export const ACCESOS_POR_CARGO: Record<string, string[]> = {
  'Ingresos':        ['Jefe de Compras', 'Almacenero', 'Administrador'],
  'Egresos':         ['Almacenero', 'Vendedor', 'Administrador'],
  'Productos':       ['Jefe de Compras', 'Almacenero', 'Vendedor', 'Administrador'],
  'Proveedores':     ['Jefe de Compras',  'Administrador'],
  'Almacen':         ['Jefe de Compras', 'Almacenero', 'Vendedor', 'Administrador'],
  'OrdenDeCompra':   ['Jefe de Compras', 'Administrador'],
  'AjustesGlobales': ['Administrador'],
};