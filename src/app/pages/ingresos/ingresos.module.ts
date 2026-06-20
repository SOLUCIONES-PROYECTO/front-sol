import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {IngresosRoutingModule} from "./ingresos-routing.module";
import { IngresosComponent } from './ingresos.component';

import {SharedModule} from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { IngresosFormComponent } from './ingresos-form/ingresos-form.component';

@NgModule({
  declarations: [
    IngresosComponent,
    IngresosFormComponent
  ],
  imports: [
    IngresosRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    LucideAngularModule
  ]
})
export class IngresosModule {}