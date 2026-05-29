import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenComponent } from './almacen.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AlmacenComponent
  ],
  imports: [
    AlmacenRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class AlmacenModule { }