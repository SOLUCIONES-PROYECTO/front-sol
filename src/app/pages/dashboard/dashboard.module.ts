import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BaseChartDirective } from 'ng2-charts';
import { SharedModule } from '../../shared/shared.module';
import { LucideAngularModule } from 'lucide-angular';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { JefeDashboardComponent } from './jefe-dashboard/jefe-dashboard.component';
import { AlmaceneroDashboardComponent } from './almacenero-dashboard/almacenero-dashboard.component';
import { VendedorDashboardComponent } from './vendedor-dashboard/vendedor-dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    JefeDashboardComponent,
    AlmaceneroDashboardComponent,
    VendedorDashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    BaseChartDirective,
    SharedModule,
    LucideAngularModule
  ]
})
export class DashboardModule {}