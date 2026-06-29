import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BaseChartDirective } from 'ng2-charts'; // 👈 en vez de NgChartsModule
import { SharedModule } from '../../shared/shared.module';
import { LucideAngularModule } from 'lucide-angular';

@NgModule({
  declarations: [
    DashboardComponent
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