import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        LoginRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LucideAngularModule
    ]
})
export class LoginModule {
}