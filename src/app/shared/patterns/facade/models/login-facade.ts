import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {AuthApiService} from "../../../../pages/auth/services/auth-api.service";
import {AuthService} from "../../../../pages/auth/services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {

  constructor(
    private authApiService: AuthApiService,
    private authService: AuthService,
    private router: Router,
  ) {}

  iniciarSesion(credentials: { email: string; password: string }): void {

    this.authApiService.login(credentials).subscribe({

      next: () => {

        this.authService.setUser({
    nombre: 'Angie',
    apellido: 'Pérez',
    correo: credentials.email
  });
        this.authService.login();
        this.router.navigate(['/']);
      },

      error: (error) => {
        console.error('Error al iniciar sesión', error);
      },

    });

  }

}