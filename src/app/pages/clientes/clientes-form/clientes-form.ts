import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente.service';
import { PersonaService } from '../../../core/services/persona.service';
import { Cliente } from '../../../core/class/models/cliente';
import { Persona } from '../../../core/class/models/persona';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  standalone: false,
  templateUrl: './clientes-form.html',
  styleUrl: './clientes-form.css',
})
export class ClientesForm implements OnInit {
  tituloFormulario = 'Registrar Nuevo Cliente';
  modoVista = false;
  modoEdicion = false;
  idCliente = 0;
  idPersona = 0;

  cliente: Cliente = new Cliente();
  persona: Persona = new Persona();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private personaService: PersonaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const data = this.route.snapshot.data;
    const params = this.route.snapshot.params;

    if (data['modo'] === 'ver') {
      this.modoVista = true;
      this.tituloFormulario = 'Detalle de Cliente';
    } else if (data['modo'] === 'editar') {
      this.modoEdicion = true;
      this.tituloFormulario = 'Editar Cliente';
    }

    if (params['id']) {
      this.idCliente = Number(params['id']);
      this.cargarCliente(this.idCliente);
    } else {
      // Default values
      this.cliente.estado = 'Activo';
      this.cliente.tipoCliente = 'Regular';
      this.cliente.categoriaCliente = 'C';
      this.cliente.frecuenciaCompra = 'Ocasional';
      this.persona.genero = 'M';
    }
  }

  cargarCliente(id: number): void {
    this.clienteService.buscar(id).subscribe({
      next: (c) => {
        this.cliente = c;
        this.idPersona = c.idPersona;
        // Cargar persona asociada
        this.personaService.buscar(this.idPersona).subscribe(p => {
          this.persona = p;
        });
      },
      error: (err) => console.error('Error al cargar cliente', err)
    });
  }

  guardar(): void {
    if (this.modoVista) return;

    if (!this.persona.nombre || !this.persona.apellido || !this.persona.dni) {
      alert('Por favor complete los datos obligatorios de la persona (Nombre, Apellido, DNI).');
      return;
    }

    if (this.modoEdicion) {
      // Actualizar persona y luego cliente
      forkJoin([
        this.personaService.actualizar(this.idPersona, this.persona),
        this.clienteService.actualizar(this.idCliente, this.cliente)
      ]).subscribe({
        next: () => {
          alert('Cliente actualizado correctamente');
          this.Regresar();
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar cliente: ' + (err.error?.mensaje || err.message));
        }
      });
    } else {
      // Crear persona primero
      this.personaService.crear(this.persona).subscribe({
        next: (p) => {
          this.cliente.idPersona = p.idPersona;
          if (!this.cliente.codigoCliente) {
            this.cliente.codigoCliente = 'CLI-' + p.dni;
          }
          this.clienteService.crear(this.cliente).subscribe({
            next: () => {
              alert('Cliente registrado correctamente');
              this.Regresar();
            },
            error: (err) => {
              console.error(err);
              alert('Error al registrar cliente: ' + (err.error?.mensaje || err.message));
            }
          });
        },
        error: (err) => {
          console.error(err);
          alert('Error al crear persona: ' + (err.error?.mensaje || err.message));
        }
      });
    }
  }

  Regresar(): void {
    this.location.back();
  }
}
