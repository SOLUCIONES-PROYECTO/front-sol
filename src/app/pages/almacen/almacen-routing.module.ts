import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AlmacenComponent} from './almacen.component';
import {AlmacenFormComponent} from './almacen-form/almacen-form.component';
export const ALMACEN_ROUTES: Routes = [
  {
    path: '',
    component: AlmacenComponent,
  },
  {
    path: 'ver/:id',
    component: AlmacenFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ALMACEN_ROUTES)],
  exports: [RouterModule],
})

export class AlmacenRoutingModule { }