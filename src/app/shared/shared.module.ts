import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';

import { CrudTableComponent } from './components/crud-table/crud-table.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    CrudTableComponent,
    SidebarComponent,
    NavBarComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
  ],

  exports: [
    CrudTableComponent,
    SidebarComponent,
    NavBarComponent,
  ]
})
export class SharedModule {}