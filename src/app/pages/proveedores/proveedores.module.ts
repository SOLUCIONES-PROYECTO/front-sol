import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores.component';

import { SharedModule } from '../../shared/shared.module';
import { ProveedoresFormComponent } from './proveedores-form/proveedores-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProveedoresComponent,
    ProveedoresFormComponent,
  ],
  imports: [
    ProveedoresRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProveedoresModule { }