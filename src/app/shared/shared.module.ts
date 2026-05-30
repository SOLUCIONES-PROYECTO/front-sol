import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';

import { CrudTableComponent } from './components/crud-table/crud-table.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';

@NgModule({
  declarations: [
    CrudTableComponent,
    SidebarComponent,
    NavBarComponent,
    FooterComponent,
    FormLayoutComponent,
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
    FooterComponent,
    FormLayoutComponent,
  ]
})
export class SharedModule {}