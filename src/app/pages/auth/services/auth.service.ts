import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';

export interface Usuario {
  nombre: string;
  apellido: string;
  correo: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  private userSubject =
    new BehaviorSubject<Usuario | null>(null);

  public user$ = this.userSubject.asObservable();

  constructor(
    private router: Router,
    private authApiService: AuthApiService,
  ) {

    const usuarioGuardado =
      localStorage.getItem('usuario');

    if (usuarioGuardado) {

      this.userSubject.next(
        JSON.parse(usuarioGuardado)
      );

      this.loggedInSubject.next(true);
    }

  }

  checkSession(): void {
    this.authApiService.profile().subscribe({
      next: () => this.loggedInSubject.next(true),
      error: () => this.loggedInSubject.next(false),
    });
  }

  login(): void {
    this.loggedInSubject.next(true);
  }

  setUser(user: Usuario): void {

    localStorage.setItem(
      'usuario',
      JSON.stringify(user)
    );

    this.userSubject.next(user);
  }

  getUser(): Usuario | null {
    return this.userSubject.value;
  }

  logout(): void {

    localStorage.removeItem('usuario');

    this.userSubject.next(null);
    this.loggedInSubject.next(false);

    this.authApiService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.router.navigate(['/auth/login']);
      },
    });

  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  getUserImg(): string {
    return 'https://randomuser.me/api/portraits/men/11.jpg';
  }

}