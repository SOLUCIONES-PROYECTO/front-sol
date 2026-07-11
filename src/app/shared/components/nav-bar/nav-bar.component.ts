import { Component, OnInit, OnDestroy, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

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
  
  notificaciones: any[] = [];
  mostrarNotificaciones = false;

  private authSub: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // 👇 Suscripción al observable — recibe cambios en tiempo real
    this.authSub = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;

      if (loggedIn) {
        this.usuarioSistema = this.authService.getUsuarioSistema() || '';
        this.cargo = this.authService.getCargo() || '';
        this.cargarNotificaciones();
      } else {
        this.usuarioSistema = '';
        this.cargo = '';
        this.notificaciones = [];
      }

      this.cdr.detectChanges(); // necesario por el mismo motivo de siempre en tu app
    });
  }

  cargarNotificaciones(): void {
    this.http.get<any[]>(`${environment.URL_BACKEND}/notificaciones`).subscribe({
      next: (data) => {
        this.notificaciones = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar notificaciones', err)
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

  toggleNotificaciones(): void {
    this.mostrarNotificaciones = !this.mostrarNotificaciones;
    if (this.mostrarNotificaciones) {
      this.menuAbierto = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.menuAbierto = false;
    this.mostrarNotificaciones = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.menuAbierto = false;
      this.mostrarNotificaciones = false;
    }
  }
}