import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private cdr: ChangeDetectorRef,
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

    this.loginFacade.iniciarSesion(
      this.loginFormPresenter.Value,
      () => {
        // Éxito: se ejecuta solo si el login realmente funcionó
        this.notification = {
          type: 'success',
          message: '¡Sesión iniciada correctamente! Redirigiendo...',
        };
        this.isLoading = false;
      },
      (mensaje: string) => {
        console.log('LoginComponent recibió el error:', mensaje); // ← temporal
        this.notification = {
          type: 'error',
          message: mensaje,
        };
        this.isLoading = false;
        this.cdr.detectChanges(); // Forzar la detección de cambios
      }
    );
}

}