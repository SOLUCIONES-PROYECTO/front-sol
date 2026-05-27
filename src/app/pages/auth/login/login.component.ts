import { Component, OnInit } from '@angular/core';

import { LoginFormPresenter } from './login-form.presenter';
import { LoginFacade} from "../../../shared/patterns/facade/models/login-facade";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{

  constructor(
    public loginFormPresenter: LoginFormPresenter,
    private loginFacade: LoginFacade,
  ) {}

  ngOnInit(): void {
    this.loginFormPresenter.createForm();
  }

  iniciarSesion(): void {
    if (this.loginFormPresenter.Invalid) {
      this.loginFormPresenter.MarkAllAsTouched();
      return;
    }

    this.loginFacade.iniciarSesion(
      this.loginFormPresenter.Value
    );
  }

}