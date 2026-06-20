import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {Login} from "../../../core/class/auth/login.class";
import {StepPresenter} from "../../../core/helpers/step.presenter";

@Injectable({
  providedIn: 'root',
})
export class LoginFormPresenter extends StepPresenter<Login> {

  public usuarioSistema!: FormControl;
  public password!: FormControl;

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  public initForm(): void {
    this.usuarioSistema = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required,Validators.minLength(8),]);
  }

  public createForm(): void {
    this.initForm();
    this.form = this.fb.group({
      usuarioSistema: this.usuarioSistema,
      password: this.password,
    });
  }
}
