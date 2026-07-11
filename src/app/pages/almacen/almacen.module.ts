import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenComponent } from './almacen.component';
import { SharedModule } from "../../shared/shared.module";
import { AlmacenFormComponent } from './almacen-form/almacen-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AlmacenComponent,
    AlmacenFormComponent
  ],
  imports: [
    AlmacenRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class AlmacenModule {}