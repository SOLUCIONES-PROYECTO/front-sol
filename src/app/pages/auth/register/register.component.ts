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
    console.log('Formulario válido:', this.registerFormPresenter.Form?.valid);
    console.log('Valores:', this.registerFormPresenter.Form?.value);
    console.log('Errores del form:', this.registerFormPresenter.Form?.errors);
    console.log('Errores password:', this.registerFormPresenter.Form?.get('password')?.errors);
    console.log('Errores confirmar:', this.registerFormPresenter.Form?.get('confirmarPassword')?.errors);

    Object.keys(this.registerFormPresenter.Form?.controls || {}).forEach(key => {
    const control = this.registerFormPresenter.Form?.get(key);
    if (control?.invalid) {
    console.log(`Campo inválido: ${key}`, control.errors);
    }
    });
    if (this.registerFormPresenter.Invalid) {
      this.registerFormPresenter.MarkAllAsTouched();
      console.log('Formulario inválido');
      return;
    }

    this.registerFacade.registrarUsuario(
      this.registerFormPresenter.Value
    );
  }
}
