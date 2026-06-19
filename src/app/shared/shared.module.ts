import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LucideAngularModule } from 'lucide-angular';

import { CrudTableComponent } from './components/crud-table/crud-table.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
@NgModule({
  declarations: [
    CrudTableComponent,
    SidebarComponent,
    NavBarComponent,
    FooterComponent,
    FormLayoutComponent,
    FilterPanelComponent,
    SearchBarComponent,
    ConfirmModalComponent
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
    FilterPanelComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule {}