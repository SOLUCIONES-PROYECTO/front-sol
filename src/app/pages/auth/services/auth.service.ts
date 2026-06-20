import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';
import { LoginResponse } from '../../../core/class/auth/login.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private router: Router,
    private authApiService: AuthApiService
  ) {}

  login(response: LoginResponse): void {

    localStorage.setItem('token', response.token);
    localStorage.setItem('rol', response.rol);
    localStorage.setItem('usuarioSistema', response.usuarioSistema);

    this.loggedInSubject.next(true);

  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuarioSistema');

    this.loggedInSubject.next(false);

    this.router.navigate(['/auth/login']);

  }

  isAuthenticated(): boolean {

    return !!localStorage.getItem('token');

  }

  getUsuarioSistema(): string {

    return localStorage.getItem('usuarioSistema') ?? '';

  }

  getRol(): string {

    return localStorage.getItem('rol') ?? '';

  }

}