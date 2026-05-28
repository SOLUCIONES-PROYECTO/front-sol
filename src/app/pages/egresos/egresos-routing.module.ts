import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EgresosComponent} from "./egresos.component";
export const EGRESOS_ROUTES: Routes = [
  {
    path: '',
    component: EgresosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(EGRESOS_ROUTES)],
  exports: [RouterModule],
})

export class EgresosRoutingModule { }
