import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [
    ProductosRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class ProductosModule { }