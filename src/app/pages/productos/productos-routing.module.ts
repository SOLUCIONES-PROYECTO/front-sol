import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';

export const PRODUCTOS_ROUTES: Routes = [
  {
    path: '',
    component: ProductosComponent,
  },
  {
    path: 'nuevo',
    component: ProductoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(PRODUCTOS_ROUTES),],
  exports: [RouterModule],
})
export class ProductosRoutingModule { }