import { Component, OnInit } from '@angular/core';

import { RegisterFormPresenter } from './register-form.presenter';
import { RegisterFacade } from '../../../shared/patterns/facade/models/register-facade';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {

  constructor(
    public registerFormPresenter: RegisterFormPresenter,
    private registerFacade: RegisterFacade,
  ) {}

  ngOnInit(): void {
    this.registerFormPresenter.createForm();
  }

  registrarUsuario(): void {
    if (this.registerFormPresenter.Invalid) {
      this.registerFormPresenter.MarkAllAsTouched();
      return;
    }
    
    this.registerFacade.registrarUsuario(
      this.registerFormPresenter.Value
    );
  }

}