import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProveedoresComponent,
  ],
  imports: [
    ProveedoresRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class ProveedoresModule { }