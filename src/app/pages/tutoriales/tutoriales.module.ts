import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorialesRoutingModule } from './tutoriales-routing.module';
import { TutorialesComponent } from './tutoriales.component';

import { SharedModule } from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TutorialesComponent,
  ],
  imports: [
    TutorialesRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TutorialesModule { }