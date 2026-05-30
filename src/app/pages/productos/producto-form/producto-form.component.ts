import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-producto-form',
  standalone: false,
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css',
})
export class ProductoFormComponent {
   constructor(private router: Router) {}

  Regresar(): void {
    this.router.navigate(['/productos']);
  }
}
