import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Empleado } from '../../../core/class/models/empleado';
import { Persona } from '../../../core/class/models/persona';
import { Cargo } from '../../../core/class/models/cargo';
import { Area } from '../../../core/class/models/area';

import { EmpleadoService } from '../../../core/services/empleado.service';
import { PersonaService } from '../../../core/services/persona.service';
import { CargoService } from '../../../core/services/cargo.service';
import { AreaService } from '../../../core/services/area.service';

@Component({
  selector: 'app-ajustes-globales-form',
  standalone: false,
  templateUrl: './ajustes-globales-form.component.html',
  styleUrl: './ajustes-globales-form.component.css',
})
export class AjustesGlobalesFormComponent implements OnInit {

  empleado: Empleado = new Empleado();
  persona: Persona = new Persona();

  modoEdicion = false;
  modoVista = false;
  idEmpleado: number | null = null;

  cargos: Cargo[] = [];
  areas: Area[] = [];

  turnos = ['Mañana', 'Tarde'];
  estados = ['Activo', 'Inactivo'];

  guardando = false;

  // — Modal de alerta —
  showAlertModal = false;
  alertTitle = '';
  alertMessage = '';
  alertType: 'error' | 'success' = 'error';

  nuevaContrasena = '';
confirmarContrasena = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private personaService: PersonaService,
    private cargoService: CargoService,
    private areaService: AreaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const modo = this.route.snapshot.data['modo'] || 'ver';
    this.modoEdicion = modo === 'editar';
    this.modoVista = modo === 'ver';

    const idParam = this.route.snapshot.paramMap.get('id');
    this.idEmpleado = idParam ? Number(idParam) : null;

    forkJoin({
      cargos: this.cargoService.listar(),
      areas: this.areaService.listar(),
    }).subscribe({
      next: (res) => {
        this.cargos = res.cargos;
        this.areas = res.areas;
        this.cdr.detectChanges();

        if (this.idEmpleado) {
          this.cargarEmpleado(this.idEmpleado);
        }
      },
      error: (err) => console.error(err)
    });
  }

  get tituloFormulario(): string {
    return this.modoVista ? 'Detalle de Usuario' : 'Editar Usuario';
  }

  cargarEmpleado(id: number): void {
    this.empleadoService.buscar(id).subscribe({
      next: (data) => {
        this.empleado = data;

        this.personaService.buscar(data.idPersona).subscribe({
          next: (persona) => {
            this.persona = persona;
            this.cdr.detectChanges();
          },
          error: (err) => console.error(err)
        });
      },
      error: (err) => console.error(err)
    });
  }

  Regresar(): void {
    this.router.navigate(['/ajustes-globales']);
  }

  private mostrarAlerta(title: string, message: string, type: 'error' | 'success'): void {
    this.alertTitle = title;
    this.alertMessage = message;
    this.alertType = type;
    this.showAlertModal = true;
    this.cdr.detectChanges();
  }

  onCerrarAlerta(): void {
    this.showAlertModal = false;
    const fueExito = this.alertType === 'success';
    this.cdr.detectChanges();

    if (fueExito) {
      this.router.navigate(['/ajustes-globales']);
    }
  }

  private validarCamposObligatorios(): string[] {
    const errores: string[] = [];

    if (!this.persona.nombre) errores.push('Nombre');
    if (!this.persona.apellido) errores.push('Apellido');
    if (!this.persona.dni) errores.push('DNI');
    if (!this.persona.correo) errores.push('Correo');
    if (!this.persona.telefono) errores.push('Teléfono');
    if (!this.empleado.cargo) errores.push('Cargo');
    if (!this.empleado.area) errores.push('Área');
    if (!this.empleado.turnoTrabajo) errores.push('Turno de trabajo');
    if (!this.empleado.estado) errores.push('Estado');

    return errores;
  }

  guardar(): void {

    const errores = this.validarCamposObligatorios();

    if (errores.length > 0) {
      this.mostrarAlerta(
        'Faltan datos por completar',
        'Por favor revisa los siguientes campos:\n• ' + errores.join('\n• '),
        'error'
      );
      return;
    }

    this.guardando = true;

    forkJoin({
      empleado: this.empleadoService.actualizar(this.idEmpleado!, this.empleado),
      persona: this.personaService.actualizar(this.empleado.idPersona, this.persona),
    }).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarAlerta('Usuario actualizado', 'Los cambios se guardaron correctamente.', 'success');
      },
      error: (err) => {
        this.guardando = false;
        console.error(err);
        this.mostrarAlerta('Ocurrió un error', 'No se pudo actualizar el usuario. Inténtalo de nuevo.', 'error');
      }
    });
  }

  get contrasenasNoCoinciden(): boolean {
  return this.nuevaContrasena.length > 0 && this.nuevaContrasena !== this.confirmarContrasena;
}

cambiarContrasena(): void {

  if (!this.nuevaContrasena) {
    this.mostrarAlerta('Campo vacío', 'Escribe una nueva contraseña antes de guardar.', 'error');
    return;
  }

  if (this.nuevaContrasena.length < 8) {
    this.mostrarAlerta('Contraseña muy corta', 'La contraseña debe tener al menos 8 caracteres.', 'error');
    return;
  }

  if (this.contrasenasNoCoinciden) {
    this.mostrarAlerta('Las contraseñas no coinciden', 'Verifica que ambos campos sean iguales.', 'error');
    return;
  }

  this.empleadoService.cambiarContrasena(this.idEmpleado!, this.nuevaContrasena).subscribe({
    next: () => {
      this.nuevaContrasena = '';
      this.confirmarContrasena = '';
      this.mostrarAlerta('Contraseña actualizada', 'La contraseña se cambió correctamente.', 'success');
    },
    error: (err) => {
      console.error(err);
      this.mostrarAlerta('Ocurrió un error', 'No se pudo cambiar la contraseña. Inténtalo de nuevo.', 'error');
    }
  });
}
}