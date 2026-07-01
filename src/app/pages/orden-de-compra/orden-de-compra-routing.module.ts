import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdenDeCompraComponent} from './orden-de-compra.component';
import { OrdenesCompraFormComponent } from './ordenescompra-form/ordenescompra-form.component';

export const ORDENES_COMPRA_ROUTES: Routes = [
  {
    path: '',
    component: OrdenDeCompraComponent,
  },
  {
    path: 'nuevo',
    component: OrdenesCompraFormComponent,
  },
  {
    path: 'editar/:id',
    component: OrdenesCompraFormComponent,
    data: { modo: 'editar' }
  },
  {
    path: 'ver/:id',
    component: OrdenesCompraFormComponent,
    data: { modo: 'ver' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(ORDENES_COMPRA_ROUTES)],
  exports: [RouterModule],
})
export class OrdenesCompraRoutingModule { }