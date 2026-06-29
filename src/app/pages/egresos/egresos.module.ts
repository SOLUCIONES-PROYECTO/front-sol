import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {EgresosRoutingModule} from "./egresos-routing.module";
import { EgresosComponent } from './egresos.component';

import {SharedModule} from "../../shared/shared.module";
import { EgresosFormComponent } from './egresos-form/egresos-form.component';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@NgModule({
  declarations: [
    EgresosComponent,
    EgresosFormComponent
  ],
  imports: [
    EgresosRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    LucideAngularModule

  ]
})
export class EgresosModule {}