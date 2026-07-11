import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './core/security/auth.guard'; // ajusta la ruta real
import { CargoGuard } from './core/security/cargo.guard'; // ajusta la ruta real

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeComponentModule),
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'almacen',
        canActivate: [CargoGuard],
        data: { seccion: 'Almacen' },
        loadChildren: () =>
          import('./pages/almacen/almacen.module').then(
            (m) => m.AlmacenModule
          ),
      },
      {
        path: 'ingresos',
        canActivate: [CargoGuard],
        data: { seccion: 'Ingresos' },
        loadChildren: () =>
          import('./pages/ingresos/ingresos.module').then(
            (m) => m.IngresosModule
          ),
      },
      {
        path: 'egresos',
        canActivate: [CargoGuard],
        data: { seccion: 'Egresos' },
        loadChildren: () =>
          import('./pages/egresos/egresos.module').then(
            (m) => m.EgresosModule
          ),
      },
      {
        path: 'orden-de-compra',
        canActivate: [CargoGuard],
        data: { seccion: 'OrdenDeCompra' },
        loadChildren: () =>
          import('./pages/orden-de-compra/orden-de-compra.module').then(
            (m) => m.OrdenDeCompraModule
          ),
      },
      {
        path: 'productos',
        canActivate: [CargoGuard],
        data: { seccion: 'Productos' },
        loadChildren: () =>
          import('./pages/productos/productos.module').then(
            (m) => m.ProductosModule
          ),
      },
      {
        path: 'proveedores',
        canActivate: [CargoGuard],
        data: { seccion: 'Proveedores' },
        loadChildren: () =>
          import('./pages/proveedores/proveedores.module').then(
            (m) => m.ProveedoresModule
          ),
      },
      {
        path: 'clientes',
        canActivate: [CargoGuard],
        data: { seccion: 'Clientes' }, // Or whatever section name matches in CargoGuard/Permissions
        loadChildren: () =>
          import('./pages/clientes/clientes-module').then(
            (m) => m.ClientesModule
          ),
      },
      {
        path: 'ajustes-globales',
        canActivate: [CargoGuard],
        data: { seccion: 'AjustesGlobales' },
        loadChildren: () =>
          import('./pages/ajustes-globales/ajustes-globales.module').then(
            (m) => m.AjustesGlobalesModule
          ),
      },
      {
        path: 'auditoria',
        canActivate: [CargoGuard],
        data: { seccion: 'AjustesGlobales' },
        loadChildren: () =>
          import('./pages/auditoria/auditoria-module').then(
            (m) => m.AuditoriaModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }