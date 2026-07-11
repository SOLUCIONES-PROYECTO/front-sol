import { Component } from '@angular/core';
import { SidebarCounterService } from '../../services/sidebar-counter.service';
import { AuthService } from '../../../core/services/auth/auth.service'; // ajusta la ruta real
import { ACCESOS_POR_CARGO } from '../../../core/config/accesos-por-cargo';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  constructor(
    public sidebarCounter: SidebarCounterService,
    private authService: AuthService,
  ) {}

  puedeVer(seccion: string): boolean {
    const cargoActual = this.authService.getCargo();
    const cargosPermitidos = ACCESOS_POR_CARGO[seccion];
    return !!cargoActual && !!cargosPermitidos && cargosPermitidos.includes(cargoActual);
  }
}