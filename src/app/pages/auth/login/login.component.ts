import { Component, OnInit } from '@angular/core';
import { LoginFormPresenter } from './login-form.presenter';
import { LoginFacade } from '../../../shared/patterns/facade/models/login-facade';

interface Notification {
  type: 'success' | 'error' | 'info';
  message: string;
}

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  showPassword = false;
  isLoading    = false;
  notification: Notification | null = null;

  constructor(
    public loginFormPresenter: LoginFormPresenter,
    private loginFacade: LoginFacade,
  ) {}

  ngOnInit(): void {
    this.loginFormPresenter.createForm();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  clearNotification(): void {
    this.notification = null;
  }

  iniciarSesion(): void {
    this.clearNotification();

    if (this.loginFormPresenter.Invalid) {
      this.loginFormPresenter.MarkAllAsTouched();
      return;
    }

    this.isLoading = true;

    // Adapta según lo que devuelva tu facade (Observable, Promise, etc.)
    try {
      this.loginFacade.iniciarSesion(this.loginFormPresenter.Value);

      // Si el facade es síncrono o maneja la navegación internamente,
      // muestra el éxito brevemente antes de que Angular redirija.
      this.notification = {
        type: 'success',
        message: '¡Sesión iniciada correctamente! Redirigiendo...',
      };
    } catch (error: any) {
      this.notification = {
        type: 'error',
        message: error?.message ?? 'Credenciales incorrectas. Verifica tu usuario y contraseña.',
      };
    } finally {
      this.isLoading = false;
    }
  }

}