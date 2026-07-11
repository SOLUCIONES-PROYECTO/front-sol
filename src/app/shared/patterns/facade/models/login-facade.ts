import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService } from "../../../../pages/auth/services/auth-api.service";
import { AuthService } from "../../../../core/services/auth/auth.service";

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {

  constructor(
    private authApiService: AuthApiService,
    private authService: AuthService,
    private router: Router,
  ) { }

  iniciarSesion(
    credentials: { usuarioSistema: string; password: string },
    onSuccess: () => void,
    onError: (mensaje: string) => void
  ): void {

    this.authApiService.login(credentials as any).subscribe({
      next: (response) => {
        this.authService.login(response);
        this.router.navigate(['/dashboard']);
        onSuccess();
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        console.log('Voy a llamar a onError ahora'); // ← temporal
        const mensaje = error?.error?.mensaje
          || error?.error?.message
          || 'Usuario o contraseña incorrectos. Vuelve a intentarlo.';
        console.log('mensaje calculado:', mensaje); // ← temporal
        onError(mensaje);
        console.log('onError ya fue llamado'); // ← temporal
      }
    });
  }
}