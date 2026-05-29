import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdenCompraComponent } from './orden-compra.component';

export const ORDEN_COMPRA_ROUTES: Routes = [
  {
    path: '',
    component: OrdenCompraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ORDEN_COMPRA_ROUTES)],
  exports: [RouterModule],
})
export class OrdenCompraRoutingModule { }
