import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginFormPresenter } from './login-form.presenter';
import { LoginFacade } from '../../../shared/patterns/facade/models/login-facade';
import { AuthApiService } from '../services/auth-api.service';

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
  
  // NUEVO: Variables para la recuperación de contraseña
  showForgotPasswordModal = false;
  forgotPasswordEmail = '';
  isSendingEmail = false;

  constructor(
    public loginFormPresenter: LoginFormPresenter,
    private loginFacade: LoginFacade,
    private cdr: ChangeDetectorRef,
    private authApi: AuthApiService
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

  // NUEVO: Métodos para la funcionalidad de olvidé mi contraseña
  openForgotPassword(event: Event): void {
    event.preventDefault();
    this.showForgotPasswordModal = true;
    this.forgotPasswordEmail = '';
  }

  closeForgotPassword(): void {
    this.showForgotPasswordModal = false;
  }

  onEmailChange(event: any): void {
    this.forgotPasswordEmail = event.target.value;
  }

  requestPasswordReset(): void {
    if (!this.forgotPasswordEmail || !this.forgotPasswordEmail.includes('@')) {
      this.notification = {
        type: 'error',
        message: 'Por favor, ingresa un correo electrónico válido.'
      };
      return;
    }

    this.isSendingEmail = true;
    
    this.authApi.requestPasswordReset(this.forgotPasswordEmail).subscribe({
      next: (res: any) => {
        this.isSendingEmail = false;
        this.closeForgotPassword();
        this.notification = {
          type: 'success',
          message: res.mensaje || 'Si el correo existe, recibirás un enlace de recuperación pronto.'
        };
        this.cdr.detectChanges();
      },
      error: () => {
        this.isSendingEmail = false;
        this.notification = {
          type: 'error',
          message: 'Error al solicitar el enlace. Inténtalo más tarde.'
        };
        this.cdr.detectChanges();
      }
    });
  }
}