import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../../../../core/class/auth/register.class';
import { AuthApiService } from '../../../../pages/auth/services/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacade {

  constructor(
    private authApiService: AuthApiService,
    private router: Router,
  ) {}

  registrarUsuario(register: Register): void {
    this.authApiService.register(Register.toJson(register)).subscribe({
      next: () => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Error al registrar usuario', error);
        alert('Error al registrar, intenta de nuevo');
      },

      });
  }

}
