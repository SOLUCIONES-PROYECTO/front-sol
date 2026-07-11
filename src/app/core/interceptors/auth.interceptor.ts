import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const usuarioSistema = this.authService.getUsuarioSistema();
    
    if (usuarioSistema) {
      request = request.clone({
        setHeaders: {
          'X-Usuario-Sistema': usuarioSistema
        }
      });
    }

    return next.handle(request);
  }
}
