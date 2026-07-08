import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AjustesGlobalesComponent} from './ajustes-globales.component';
import {AjustesGlobalesFormComponent} from './ajustes-globales-form/ajustes-globales-form.component';
export const AJUSTES_GLOBALES_ROUTES: Routes = [
  {
    path: '',
    component: AjustesGlobalesComponent,
  },
  {
    path: 'editar/:id',
    component: AjustesGlobalesFormComponent,
    data: { modo: 'editar' }
  },
  {
    path: 'ver/:id',
    component: AjustesGlobalesFormComponent,
    data: { modo: 'ver' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(AJUSTES_GLOBALES_ROUTES)],
  exports: [RouterModule],
})

export class AjustesGlobalesRoutingModule { }