import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditoriaRoutingModule } from './auditoria-routing-module';
import { AuditoriaComponent } from './auditoria';
import { LucideAngularModule } from 'lucide-angular';


@NgModule({
  declarations: [
    AuditoriaComponent
  ],
  imports: [
    CommonModule,
    AuditoriaRoutingModule,
    LucideAngularModule
  ]
})
export class AuditoriaModule { }
