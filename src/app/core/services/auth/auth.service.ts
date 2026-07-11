import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../pages/auth/services/auth-api.service';
import { LoginResponse } from '../../../core/class/auth/login.response';

const SESSION_STORAGE_KEYS = ['token', 'usuarioSistema', 'cargo'];

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
    this.restoreSession();
    window.addEventListener('storage', () => this.restoreSession());
    window.addEventListener('beforeunload', () => this.clearSessionForTabClose());
  }

  private restoreSession(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.loggedInSubject.next(true);
    } else {
      this.loggedInSubject.next(false);
    }
  }

  private clearSessionForTabClose(): void {
    SESSION_STORAGE_KEYS.forEach((key) => sessionStorage.removeItem(key));
  }

  login(response: LoginResponse): void {
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('usuarioSistema', response.usuarioSistema);
    sessionStorage.setItem('cargo', response.cargo);
    this.loggedInSubject.next(true);
  }

  logout(): void {
    this.clearSession();
    this.loggedInSubject.next(false);

    this.authApiService.logout().subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: () => this.router.navigate(['/auth/login']),
    });
  }

  private clearSession(): void {
    SESSION_STORAGE_KEYS.forEach((key) => sessionStorage.removeItem(key));
  }

  getCargo(): string | null {
    return sessionStorage.getItem('cargo');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getUsuarioSistema(): string {
    return sessionStorage.getItem('usuarioSistema') || '';
  }
}
