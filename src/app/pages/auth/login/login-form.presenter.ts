import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {Login} from "../../../core/class/auth/login.class";
import {StepPresenter} from "../../../core/helpers/step.presenter";

@Injectable({
  providedIn: 'root',
})
export class LoginFormPresenter extends StepPresenter<Login> {

  public email!: FormControl;
  public password!: FormControl;

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  public initForm(): void {
    this.email = new FormControl(null, [Validators.required,Validators.email,]);
    this.password = new FormControl(null, [Validators.required,Validators.minLength(8),]);
  }

  public createForm(): void {
    this.initForm();
    this.form = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }
}
