import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {IngresosRoutingModule} from "./ingresos-routing.module";
import { IngresosComponent } from './ingresos.component';

import {SharedModule} from "../../shared/shared.module";
import { IngresosFormComponent } from './ingresos-form/ingresos-form.component';

@NgModule({
  declarations: [
    IngresosComponent,
    IngresosFormComponent
  ],
  imports: [
    IngresosRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class IngresosModule {}