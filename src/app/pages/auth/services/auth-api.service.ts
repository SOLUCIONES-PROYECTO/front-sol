import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../../core/class/auth/login.class';
import { LoginResponse } from '../../../core/class/auth/login.response';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  private readonly baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.baseUrl}/auth/login`,
      Login.toJson(credentials)
    );
  }

  register(registerData: unknown) {
  return this.http.post(
    `${this.baseUrl}/auth/register`,
    registerData
  );
}

logout() {
  return this.http.post(
    `${this.baseUrl}/auth/logout`,
    {}
  );
}

// NUEVO: Endpoint para solicitar recuperación de contraseña al backend
requestPasswordReset(email: string): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/auth/forgot-password`,
    { email }
  );
}

// NUEVO: Endpoint para procesar el restablecimiento de contraseña
resetPassword(token: string, nuevaContrasena: string): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/auth/reset-password`,
    { token, nuevaContrasena }
  );
}

getAreas(): Observable<{ idArea: number; nombre: string }[]> {
    return this.http.get<{ idArea: number; nombre: string }[]>(`${this.baseUrl}/areas`);
  }

  getCargos(): Observable<{ idCargo: number; nombre: string }[]> {
    return this.http.get<{ idCargo: number; nombre: string }[]>(`${this.baseUrl}/cargos`);
  }

}
