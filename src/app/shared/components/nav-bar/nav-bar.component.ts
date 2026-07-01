import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';

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
    private authService: AuthService,
    private elementRef: ElementRef
  ) { }

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.menuAbierto = false;
    }
  }

}
