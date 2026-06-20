import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {OrdenDeCompraComponent} from "./orden-de-compra.component";
export const ORDEN_DE_COMPRA_ROUTES: Routes = [
  {
    path: '',
    component: OrdenDeCompraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ORDEN_DE_COMPRA_ROUTES)],
  exports: [RouterModule],
})

export class OrdenDeCompraRoutingModule { }