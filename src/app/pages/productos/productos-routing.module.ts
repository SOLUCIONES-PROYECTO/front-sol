import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ProductosComponent} from "./productos.component";
export const PRODUCTOS_ROUTES: Routes = [
  {
    path: '',
    component: ProductosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(PRODUCTOS_ROUTES)],
  exports: [RouterModule],
})

export class ProductosRoutingModule { }
