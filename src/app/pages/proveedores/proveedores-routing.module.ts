import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProveedoresComponent } from './proveedores.component';
import { ProveedoresFormComponent } from './proveedores-form/proveedores-form.component';

export const PROVEEDORES_ROUTES: Routes = [
  {
    path: '',
    component: ProveedoresComponent,
  },
  {
    path: 'nuevo',
    component: ProveedoresFormComponent,
    data: { modo: 'nuevo' }
  },
  {
    path: 'editar/:id',
    component: ProveedoresFormComponent,
    data: { modo: 'editar' }
  },
  {
    path: 'ver/:id',
    component: ProveedoresFormComponent,
    data: { modo: 'ver' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(PROVEEDORES_ROUTES)],
  exports: [RouterModule],
})
export class ProveedoresRoutingModule { }