import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { Producto } from '../../../core/class/models/productos';
import { ProductoService } from '../../../core/services/producto.service';

@Component({
  selector: 'app-producto-form',
  standalone: false,
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css',
})
export class ProductoFormComponent {
  producto: Producto = new Producto();

  constructor(
    private router: Router,
    private productoService: ProductoService
  ) {}

  Regresar(): void {
    this.router.navigate(['/productos']);
  }

  guardar(): void {

  this.productoService
    .crearProducto(this.producto)
    .subscribe({

      next: (resp) => {
        console.log(resp);

        alert('Producto registrado');

        this.router.navigate(['/productos']);
      },

      error: (err) => {
        console.error(err);
      }
    });
}
}
