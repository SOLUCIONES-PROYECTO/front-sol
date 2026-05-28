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
        path: 'productos',
        loadChildren: () =>
          import('./pages/productos/productos.module').then(
            (m) => m.ProductosModule
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
