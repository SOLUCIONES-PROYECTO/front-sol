import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardLayoutComponent} from "../app/layout/dashboard-layout/dashboard-layout.component";
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
          import('../app/pages/dashboard/dashboard.module').then(
            (m) => m.DASHBOARD_ROUTES
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
