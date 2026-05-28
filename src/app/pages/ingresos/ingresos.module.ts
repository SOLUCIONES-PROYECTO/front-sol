import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {IngresosRoutingModule} from "./ingresos-routing.module";
import { IngresosComponent } from './ingresos.component';

import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    IngresosComponent
  ],
  imports: [
    IngresosRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class IngresosModule {}