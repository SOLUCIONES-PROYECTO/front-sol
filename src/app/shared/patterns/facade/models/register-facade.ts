import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Register } from '../../../../core/class/auth/register.class';
import { AuthApiService } from '../../../../pages/auth/services/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacade {

  constructor(private authApiService: AuthApiService) {}

  registrarUsuario(register: Register): Observable<void> {
    return this.authApiService.register(Register.toJson(register)).pipe(
      map(() => undefined)
    );
  }
}