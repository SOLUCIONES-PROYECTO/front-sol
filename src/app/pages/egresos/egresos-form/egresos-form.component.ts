import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-egresos-form',
  standalone: false,
  templateUrl: './egresos-form.component.html',
  styleUrl: './egresos-form.component.css',
})
export class EgresosFormComponent {
   constructor(private router: Router) {}

  Regresar(): void {
    this.router.navigate(['/egresos']);
  }
}