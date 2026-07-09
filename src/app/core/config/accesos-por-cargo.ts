export const ACCESOS_POR_CARGO: Record<string, string[]> = {
  'Ingresos':        ['Jefe de Compras', 'Almacenero', 'Contador', 'Administrador'],
  'Egresos':         ['Almacenero', 'Vendedor', 'Contador', 'Administrador'],
  'Productos':       ['Jefe de Compras', 'Almacenero', 'Vendedor', 'Administrador'],
  'Proveedores':     ['Jefe de Compras', 'Contador', 'Administrador'],
  'Almacen':         ['Jefe de Compras', 'Almacenero', 'Vendedor', 'Administrador'],
  'OrdenDeCompra':   ['Jefe de Compras', 'Contador', 'Administrador'],
  'AjustesGlobales': ['Administrador'],
};