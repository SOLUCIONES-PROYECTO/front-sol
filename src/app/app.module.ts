import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { SharedModule } from './shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';


import {
  LucideAngularModule,
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
  Trash,
  Filter,
  ExpandIcon,
  ChevronDown,
  ChevronUp,
  X,
  LogOut,
} from 'lucide-angular';


@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    LucideAngularModule.pick(
      {
        Menu,
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
        Trash,
        Filter,
        ExpandIcon,
        ChevronDown,
        ChevronUp,
        X,
        LogOut
      }),
  ],
  providers: [
    provideCharts(withDefaultRegisterables())  // 👈 agrega esto
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }