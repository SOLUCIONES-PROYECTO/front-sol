import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LucideAngularModule, icons } from 'lucide-angular';

import { ClientesRoutingModule } from './clientes-routing-module';
import { Clientes } from './clientes';
import { ClientesForm } from './clientes-form/clientes-form';
import { ClientesHistorial } from './clientes-historial/clientes-historial';


@NgModule({
  declarations: [
    Clientes,
    ClientesForm,
    ClientesHistorial
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    LucideAngularModule.pick(icons),
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
