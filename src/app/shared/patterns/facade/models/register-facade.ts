import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Register } from '../../../../core/class/auth/register.class';
import { AuthApiService } from '../../../../pages/auth/services/auth-api.service';
import { AuthService } from '../../../../pages/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacade {

  constructor(
    private authApiService: AuthApiService,
    private authService: AuthService,
    private router: Router,
  ) {}

  registrarUsuario(register: Register): void {

    this.authApiService
      .register(Register.toJson(register))
      .subscribe({

        next: () => {

          this.authService.login();
          this.router.navigate(['/']);

        },

        error: (error) => {
          console.error('Error al registrar usuario', error);
        },

      });

  }

}