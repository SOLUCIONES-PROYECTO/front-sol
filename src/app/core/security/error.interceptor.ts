import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          this.sesionExpirada();
        }

        return throwError(() => error);
      })
    );
  }

  private sesionExpirada(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioSistema');
    localStorage.removeItem('cargo');

    this.router.navigate(['/auth/login']);
  }
}