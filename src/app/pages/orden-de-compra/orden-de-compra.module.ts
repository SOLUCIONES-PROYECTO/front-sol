import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {OrdenesCompraRoutingModule} from "./orden-de-compra-routing.module";
import { OrdenDeCompraComponent } from './orden-de-compra.component';

import {SharedModule} from "../../shared/shared.module";
import { OrdenesCompraFormComponent } from './ordenescompra-form/ordenescompra-form.component';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
@NgModule({
  declarations: [
    OrdenDeCompraComponent,
    OrdenesCompraFormComponent
  ],
  imports: [
    OrdenesCompraRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    LucideAngularModule
  ]
})
export class OrdenDeCompraModule {}