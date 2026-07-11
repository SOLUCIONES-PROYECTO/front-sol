import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../../../../core/class/auth/register.class';
import { AuthApiService } from '../../../../pages/auth/services/auth-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacade {

  constructor(
    private authApiService: AuthApiService,
    private router: Router,
  ) {}

  registrarUsuario(register: Register): Observable<any> {
    return this.authApiService.register(Register.toJson(register));
  }

}
