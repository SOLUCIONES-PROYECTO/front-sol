import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService } from "../../../../pages/auth/services/auth-api.service";
import { AuthService } from "../../../../pages/auth/services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {

  constructor(
    private authApiService: AuthApiService,
    private authService: AuthService,
    private router: Router,
  ) { }

  iniciarSesion(credentials: {
    usuarioSistema: string;
    password: string;
  }): void {

    this.authApiService.login(credentials as any).subscribe({
      next: (response) => {
        this.authService.login(response);
      this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
