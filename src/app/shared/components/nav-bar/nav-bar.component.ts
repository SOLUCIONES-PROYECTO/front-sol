import { Component, OnInit } from '@angular/core';
import { AuthService, Usuario } from '../../../pages/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {

  mostrarModal: boolean = false;

  usuario: Usuario | null = null;

  constructor(
    private authService: AuthService
  ) {}

  menuAbierto = false;

toggleMenu(): void {
  this.menuAbierto = !this.menuAbierto;
}

  ngOnInit(): void {

    this.authService.user$.subscribe(user => {
      this.usuario = user;
    });

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