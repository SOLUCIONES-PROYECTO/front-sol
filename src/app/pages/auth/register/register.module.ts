import {NgModule} from '@angular/core';
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        RegisterRoutingModule,
        CommonModule,
        ReactiveFormsModule
    ]
})
export class RegisterModule {
}