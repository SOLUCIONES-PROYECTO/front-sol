import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  public correo!: FormControl;
  public direccion!: FormControl;
  public fechaNacimiento!: FormControl;
  public telefono!: FormControl;
  public genero!: FormControl;
  public usuarioSistema!: FormControl;
  public password!: FormControl;
  public confirmarPassword!: FormControl;
  public cargo!: FormControl;
  public area!: FormControl;

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  public initForm(): void {
    this.nombres = new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    this.apellidos = new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    this.dni = new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^\d{8}$/)]);
    this.correo = new FormControl(null, [Validators.required, Validators.email]);
    this.direccion = new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]);
    this.fechaNacimiento = new FormControl(null, [Validators.required]);
    this.telefono = new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(15),Validators.pattern(/^\d{9}$/)]);
    this.genero = new FormControl(null, [Validators.required]);
    this.usuarioSistema = new FormControl(null, [Validators.required, Validators.minLength(4),Validators.pattern(/^[a-zA-Z0-9._]+$/)]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._#])[A-Za-z\d@$!%*?&._#]{8,}$/)]);
    this.confirmarPassword = new FormControl(null, [Validators.required]);
    this.cargo = new FormControl(null, [Validators.required]);
    this.area = new FormControl(null, [Validators.required]);
  }

  public createForm(): void {
    this.initForm();
    this.form = this.fb.group({
      nombres: this.nombres,
      apellidos: this.apellidos,
      dni: this.dni,
      correo: this.correo,
      direccion: this.direccion,
      fechaNacimiento: this.fechaNacimiento,
      telefono: this.telefono,
      genero: this.genero,
      usuarioSistema: this.usuarioSistema,
      password: this.password,
      confirmarPassword: this.confirmarPassword,
      cargo: this.cargo,
      area: this.area,
    }, {
      validators: PasswordValidator('password', 'confirmarPassword'),
    });
  }
}
