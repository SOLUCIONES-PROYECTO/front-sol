import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores.component';

import { SharedModule } from '../../shared/shared.module';
import { ProveedoresFormComponent } from './proveedores-form.component/proveedores-form.component';

@NgModule({
  declarations: [
    ProveedoresComponent,
    ProveedoresFormComponent
  ],
  imports: [
    ProveedoresRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class ProveedoresModule { }