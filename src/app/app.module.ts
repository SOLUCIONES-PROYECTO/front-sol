import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import {SharedModule} from './shared/shared.module';

import { LucideAngularModule, 
          Menu, 
          Package, 
          Users, 
          Settings, 
          User,
          ShoppingBasket,
          List,
          House,
          ClipboardList,
        Plus,
      Search,
    Pencil,
  Trash2,
ChevronLeft,
ChevronRight,
Trash } from 'lucide-angular';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    DashboardLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LucideAngularModule.pick(
      { Menu, 
        Package, 
        Users, 
        User, 
        Settings,
        ShoppingBasket,
        List,
        House,
        ClipboardList,
        Plus,
        Search,
        Pencil,
        Trash2,
        ChevronLeft,
        ChevronRight,
        Trash
       }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }