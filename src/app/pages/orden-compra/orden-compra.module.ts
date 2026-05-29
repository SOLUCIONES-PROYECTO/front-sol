import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenCompraRoutingModule } from "./orden-compra-routing.module";
import { OrdenCompraComponent } from './orden-compra.component';

import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    OrdenCompraComponent
  ],
  imports: [
    OrdenCompraRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class OrdenCompraModule {}
