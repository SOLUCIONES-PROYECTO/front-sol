import {NgModule} from '@angular/core';
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { LucideAngularModule, LucideIcons } from 'lucide-angular';
import {SharedModule} from "../../../shared/shared.module";
@NgModule({
    declarations: [RegisterComponent],
    imports: [
        RegisterRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        LucideAngularModule,
        SharedModule,
    ]
})
export class RegisterModule {
}