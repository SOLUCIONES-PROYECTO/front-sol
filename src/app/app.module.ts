import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { LucideAngularModule, 
          Menu, 
          Package, 
          Users, 
          Settings, 
          User,
          ShoppingBasket,
          List,
          House,
          ClipboardList, } from 'lucide-angular';
import { CrudTableComponent } from './shared/components/crud-table/crud-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    SidebarComponent,
    DashboardLayoutComponent,
    DashboardComponent,
    CrudTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LucideAngularModule.pick(
      { Menu, 
        Package, 
        Users, 
        User, 
        Settings,
        ShoppingBasket,
        List,
        House,
        ClipboardList }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }