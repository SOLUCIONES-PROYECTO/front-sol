import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  private readonly baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(
      `${this.baseUrl}/login`, 
      credentials, {
      withCredentials: true,
    });
  }

  register(registerData: unknown) {
    return this.http.post(
      `${this.baseUrl}/register`,
      registerData,
      {
        withCredentials: true,
      }
    );
  }

  logout() {
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      { withCredentials: true },
    );
  }

  profile() {
    return this.http.get(
      `${this.baseUrl}/profile`,
      { withCredentials: true }
    );
  }

}