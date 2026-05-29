import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlmacenComponent } from './almacen.component';

export const ALMACEN_ROUTES: Routes = [
  {
    path: '',
    component: AlmacenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ALMACEN_ROUTES)],
  exports: [RouterModule],
})
export class AlmacenRoutingModule { }