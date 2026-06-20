import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivate } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {

    const token = localStorage.getItem('token');

    if (!token) {

      this.router.navigate(['/auth/login']);
      return false;

    }

    return true;
  }

}