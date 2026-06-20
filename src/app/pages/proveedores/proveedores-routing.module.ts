import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProveedoresComponent } from './proveedores.component';

export const PROVEEDORES_ROUTES: Routes = [
  {
    path: '',
    component: ProveedoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(PROVEEDORES_ROUTES)],
  exports: [RouterModule],
})
export class ProveedoresRoutingModule { }