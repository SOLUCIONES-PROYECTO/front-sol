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
}