import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IngresosComponent } from './ingresos.component';
import { IngresosFormComponent } from './ingresos-form/ingresos-form.component';
export const INGRESOS_ROUTES: Routes = [
  {
    path: '',
    component: IngresosComponent,
  },
  {
    path: 'nuevo',
    component: IngresosFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(INGRESOS_ROUTES)],
  exports: [RouterModule],
})

export class IngresosRoutingModule { }
