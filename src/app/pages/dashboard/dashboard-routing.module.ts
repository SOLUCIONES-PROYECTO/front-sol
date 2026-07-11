import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { JefeDashboardComponent } from './jefe-dashboard/jefe-dashboard.component';
import { AlmaceneroDashboardComponent } from './almacenero-dashboard/almacenero-dashboard.component';
import { VendedorDashboardComponent } from './vendedor-dashboard/vendedor-dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent, // actúa como redirector según rol
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
  },
  {
    path: 'jefe-compras',
    component: JefeDashboardComponent,
  },
  {
    path: 'almacenero',
    component: AlmaceneroDashboardComponent,
  },
  {
    path: 'vendedor',
    component: VendedorDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
  exports: [RouterModule],
})

export class DashboardRoutingModule { }
