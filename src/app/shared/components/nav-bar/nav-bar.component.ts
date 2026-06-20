import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../../pages/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {

  mostrarModal: boolean = false;

  usuarioSistema = '';
rol = '';

  constructor(
    private authService: AuthService
  ) {}

  menuAbierto = false;

toggleMenu(): void {
  this.menuAbierto = !this.menuAbierto;
}

  isLoggedIn = false;

ngOnInit(): void {

  this.isLoggedIn = this.authService.isAuthenticated();

  this.usuarioSistema =
    this.authService.getUsuarioSistema();

  this.rol =
    this.authService.getRol();
}

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  logout(): void {
    this.authService.logout();
  }

}