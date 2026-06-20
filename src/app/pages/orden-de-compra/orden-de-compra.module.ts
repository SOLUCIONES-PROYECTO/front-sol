import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {OrdenDeCompraRoutingModule} from "./orden-de-compra-routing.module";
import { OrdenDeCompraComponent } from './orden-de-compra.component';

import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    OrdenDeCompraComponent
  ],
  imports: [
    OrdenDeCompraRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class OrdenDeCompraModule {}