import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EgresosComponent} from "./egresos.component";
import {EgresosFormComponent} from "./egresos-form.component/egresos-form.component";
export const EGRESOS_ROUTES: Routes = [
  {
    path: '',
    component: EgresosComponent,
  },
  {
    path: 'nuevo',
    component: EgresosFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(EGRESOS_ROUTES)],
  exports: [RouterModule],
})

export class EgresosRoutingModule { }
