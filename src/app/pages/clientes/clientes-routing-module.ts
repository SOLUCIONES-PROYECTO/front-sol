import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Clientes } from './clientes';
import { ClientesForm } from './clientes-form/clientes-form';
import { ClientesHistorial } from './clientes-historial/clientes-historial';

const routes: Routes = [
  { path: '', component: Clientes },
  { path: 'nuevo', component: ClientesForm, data: { modo: 'nuevo' } },
  { path: 'editar/:id', component: ClientesForm, data: { modo: 'editar' } },
  { path: 'ver/:id', component: ClientesForm, data: { modo: 'ver' } },
  { path: 'historial/:id', component: ClientesHistorial }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
