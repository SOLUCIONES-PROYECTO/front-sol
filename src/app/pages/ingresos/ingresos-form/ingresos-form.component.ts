import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ingresos-form',
  standalone: false,
  templateUrl: './ingresos-form.component.html',
  styleUrl: './ingresos-form.component.css',
})
export class IngresosFormComponent {
   constructor(private router: Router) {}

  Regresar(): void {
    this.router.navigate(['/ingresos']);
  }
}