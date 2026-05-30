import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {EgresosRoutingModule} from "./egresos-routing.module";
import { EgresosComponent } from './egresos.component';

import {SharedModule} from "../../shared/shared.module";
import { EgresosFormComponent } from './egresos-form/egresos-form.component';

@NgModule({
  declarations: [
    EgresosComponent,
    EgresosFormComponent
  ],
  imports: [
    EgresosRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class EgresosModule {}