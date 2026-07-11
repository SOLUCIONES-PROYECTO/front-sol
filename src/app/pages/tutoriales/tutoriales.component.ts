import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../core/services/auth/auth.service';
import { TUTORIALES_POR_CARGO, Tutorial } from '../../core/config/tutoriales-por-cargo';

interface TutorialConUrl extends Tutorial {
  urlSegura: SafeResourceUrl;
}

@Component({
  selector: 'app-tutoriales',
  standalone: false,
  templateUrl: './tutoriales.component.html',
  styleUrl: './tutoriales.component.css',
})
export class TutorialesComponent implements OnInit {

  tutoriales: TutorialConUrl[] = [];
  cargoActual = '';

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.cargoActual = this.authService.getCargo() ?? '';

    const lista = TUTORIALES_POR_CARGO[this.cargoActual] ?? [];

    this.tutoriales = lista.map(t => ({
      ...t,
      urlSegura: this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${t.youtubeId}`
      )
    }));
  }
}