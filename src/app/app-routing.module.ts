import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

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
        loadChildren: () =>
          import('./pages/almacen/almacen.module').then(
            (m) => m.AlmacenModule
          ),
      },
      {
        path: 'ingresos',
        loadChildren: () =>
          import('./pages/ingresos/ingresos.module').then(
            (m) => m.IngresosModule
          ),
      },
      {
        path: 'egresos',
        loadChildren: () =>
          import('./pages/egresos/egresos.module').then(
            (m) => m.EgresosModule
          ),
      },
      {
        path: 'orden-de-compra',
        loadChildren: () =>
          import('./pages/orden-de-compra/orden-de-compra.module').then(
            (m) => m.OrdenDeCompraModule
          ),
      },
      {
        path: 'productos',
        loadChildren: () =>
          import('./pages/productos/productos.module').then(
            (m) => m.ProductosModule
          ),
      },
      {
        path: 'proveedores',
        loadChildren: () =>
          import('./pages/proveedores/proveedores.module').then(
            (m) => m.ProveedoresModule
          ),
      },
      {
        path: 'orden-de-compra',
        loadChildren: () =>
          import('./pages/orden-de-compra/orden-de-compra.module').then(
            (m) => m.OrdenDeCompraModule
          ),
      },
      {
        path: 'ajustes-globales',
        loadChildren: () =>
          import('./pages/ajustes-globales/ajustes-globales.module').then(
            (m) => m.AjustesGlobalesModule
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
