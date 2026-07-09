import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../pages/auth/services/auth-api.service';
import { LoginResponse } from '../../../core/class/auth/login.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private router: Router,
    private authApiService: AuthApiService,
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedInSubject.next(true);
    }
  }

  login(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('usuarioSistema', response.usuarioSistema);
    localStorage.setItem('cargo', response.cargo); 
    this.loggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioSistema');
    localStorage.removeItem('cargo'); 
    this.loggedInSubject.next(false);

    this.authApiService.logout().subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: () => this.router.navigate(['/auth/login']),
    });
  }

  getCargo(): string | null {
    return localStorage.getItem('cargo');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsuarioSistema(): string {
    return localStorage.getItem('usuarioSistema') || '';
  }
}
