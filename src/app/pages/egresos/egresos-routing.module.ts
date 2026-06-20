import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EgresosComponent} from "./egresos.component";
import {EgresosFormComponent} from "./egresos-form/egresos-form.component";
export const EGRESOS_ROUTES: Routes = [
  {
    path: '',
    component: EgresosComponent,
  },
  {
    path: 'nuevo',
    component: EgresosFormComponent,
  },
  {
    path: 'editar/:id',
    component: EgresosFormComponent,
    data: { modo: 'editar' }
  },
  {
    path: 'ver/:id',
    component: EgresosFormComponent,
    data: { modo: 'ver' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(EGRESOS_ROUTES)],
  exports: [RouterModule],
})

export class EgresosRoutingModule { }
