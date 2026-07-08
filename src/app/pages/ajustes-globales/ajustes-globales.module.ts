import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjustesGlobalesRoutingModule } from './ajustes-globales-routing.module';
import { AjustesGlobalesComponent } from './ajustes-globales.component';
import {SharedModule} from "../../shared/shared.module";
import { AjustesGlobalesFormComponent } from './ajustes-globales-form/ajustes-globales-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AjustesGlobalesComponent,
    AjustesGlobalesFormComponent
  ],
  imports: [
    AjustesGlobalesRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AjustesGlobalesModule {}