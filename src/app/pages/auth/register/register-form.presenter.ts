import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { StepPresenter } from '../../../core/helpers/step.presenter';
import { PasswordValidator } from '../../../core/validators/password.validators';
import { Register } from '../../../core/class/auth/register.class';

@Injectable({
  providedIn: 'root',
})

export class RegisterFormPresenter extends StepPresenter<Register> {
  public nombres!: FormControl;
  public apellidos!: FormControl;
  public dni!: FormControl;
  public email!: FormControl;
  public direccion!: FormControl;
  public fechaNacimiento!: FormControl;
  public telefono!: FormControl;
  public genero!: FormControl;
  public password!: FormControl;
  public confirmarPassword!: FormControl;

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  public initForm(): void {
    this.nombres = new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    this.apellidos = new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    this.dni = new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(10)]);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.direccion = new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]);
    this.fechaNacimiento = new FormControl(null, [Validators.required]);
    this.telefono = new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(15)]);
    this.genero = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required]);
    this.confirmarPassword = new FormControl(null, [Validators.required, Validators.minLength(8)]);
  }

  public createForm(): void {
    this.initForm();
    this.form = this.fb.group({
      nombres: this.nombres,
      apellidos: this.apellidos,
      dni: this.dni,
      email: this.email,
      direccion: this.direccion,
      fechaNacimiento: this.fechaNacimiento,
      telefono: this.telefono,
      genero: this.genero,
      password: this.password,
      confirmarPassword: this.confirmarPassword,
    }, {
        validators: PasswordValidator('password', 'confirmarPassword'),
      });
  }
}
