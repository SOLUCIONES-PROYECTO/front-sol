import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'; // ajusta según tu estructura real
import { ACCESOS_POR_CARGO } from '../config/accesos-por-cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const seccion = route.data['seccion'] as string;
    const cargoActual = this.authService.getCargo();

    const cargosPermitidos = ACCESOS_POR_CARGO[seccion];

    if (!cargosPermitidos || !cargoActual || !cargosPermitidos.includes(cargoActual)) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}