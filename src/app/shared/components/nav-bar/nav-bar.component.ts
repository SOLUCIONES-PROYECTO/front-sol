import { Component, OnInit, OnDestroy, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit, OnDestroy {

  mostrarModal = false;
  menuAbierto = false;
  isLoggedIn = false;
  usuarioSistema = '';
  cargo = '';

  private authSub: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 👇 Suscripción al observable — recibe cambios en tiempo real
    this.authSub = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;

      if (loggedIn) {
        this.usuarioSistema = this.authService.getUsuarioSistema() || '';
        this.cargo = this.authService.getCargo() || '';
      } else {
        this.usuarioSistema = '';
        this.cargo = '';
      }

      this.cdr.detectChanges(); // necesario por el mismo motivo de siempre en tu app
    });
  }

  ngOnDestroy(): void {
    // Limpieza para evitar memory leaks
    this.authSub?.unsubscribe();
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  logout(): void {
    this.authService.logout();
    this.menuAbierto = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.menuAbierto = false;
    }
  }
}