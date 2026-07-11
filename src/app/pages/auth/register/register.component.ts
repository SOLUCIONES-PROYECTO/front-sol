import { Component, OnInit } from '@angular/core';
import { RegisterFormPresenter } from './register-form.presenter';
import { RegisterFacade } from '../../../shared/patterns/facade/models/register-facade';
import { AuthApiService } from '../services/auth-api.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  areas: { idArea: number; nombre: string }[] = [];
  cargos: { idCargo: number; nombre: string }[] = [];

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  passwordStrength = 0;
  passwordStrengthLabel = '';
  passwordStrengthColor = 'bg-gray-200';

  passwordRequirements = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false
  };

  errorNombres = false;
  errorApellidos = false;
  errorDireccion = false;
  errorDni = false;
  errorTelefono = false;

  constructor(
    public registerFormPresenter: RegisterFormPresenter,
    private registerFacade: RegisterFacade,
    private authApiService: AuthApiService,
  ) { }

  ngOnInit(): void {
    this.registerFormPresenter.createForm();

    this.authApiService.getAreas().subscribe(data => this.areas = data);
    this.authApiService.getCargos().subscribe(data => this.cargos = data);

    this.registerFormPresenter.Form
      .get('password')
      ?.valueChanges
      .subscribe(password => {
        this.evaluatePassword(password ?? '');
      });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  aplicarTexto(event: Event, campo: 'nombres' | 'apellidos' | 'direccion', maxLength: number): void {
    const input = event.target as HTMLInputElement;
    const valorOriginal = input.value;
    const excede = valorOriginal.length > maxLength;
    const valor = valorOriginal.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '').slice(0, maxLength);
    input.value = valor;

    if (campo === 'nombres') {
      this.errorNombres = excede;
    } else if (campo === 'apellidos') {
      this.errorApellidos = excede;
    } else {
      this.errorDireccion = excede;
    }

    this.registerFormPresenter.Form.get(campo)?.setValue(valor);
  }

  soloNumeros(event: Event, controlName: 'dni' | 'telefono', maxLength: number): void {
    const input = event.target as HTMLInputElement;
    const valorOriginal = input.value;
    const excede = valorOriginal.length > maxLength;
    const valor = valorOriginal.replace(/\D/g, '').slice(0, maxLength);
    input.value = valor;
    this.registerFormPresenter.Form.get(controlName)?.setValue(valor);

    if (controlName === 'dni') {
      this.errorDni = excede;
    } else {
      this.errorTelefono = excede;
    }
  }

  evaluatePassword(password: string): void {
    let score = 0;

    this.passwordRequirements.length = password.length >= 8;
    this.passwordRequirements.uppercase = /[A-Z]/.test(password);
    this.passwordRequirements.lowercase = /[a-z]/.test(password);
    this.passwordRequirements.number = /\d/.test(password);
    this.passwordRequirements.symbol = /[^A-Za-z0-9]/.test(password);

    Object.values(this.passwordRequirements).forEach(valid => {
      if (valid) score++;
    });

    this.passwordStrength = score;

    switch (score) {
      case 0:
      case 1:
        this.passwordStrengthLabel = 'Muy débil';
        this.passwordStrengthColor = 'bg-red-500';
        break;
      case 2:
        this.passwordStrengthLabel = 'Débil';
        this.passwordStrengthColor = 'bg-orange-500';
        break;
      case 3:
        this.passwordStrengthLabel = 'Media';
        this.passwordStrengthColor = 'bg-yellow-500';
        break;
      case 4:
        this.passwordStrengthLabel = 'Fuerte';
        this.passwordStrengthColor = 'bg-lime-500';
        break;
      case 5:
        this.passwordStrengthLabel = 'Muy fuerte';
        this.passwordStrengthColor = 'bg-green-600';
        break;
    }
  }

  get formProgress(): number {
    const controls = this.registerFormPresenter.Form.controls;
    const total = Object.keys(controls).length;
    const valid = Object.values(controls)
      .filter(control => control.valid)
      .length;
    return Math.round((valid / total) * 100);
  }

  registrarUsuario(): void {
    if (this.registerFormPresenter.Invalid) {
      this.registerFormPresenter.MarkAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.registerFacade.registrarUsuario(
      this.registerFormPresenter.Value
    );
  }

  get passwordsMatch(): boolean {
    return this.registerFormPresenter.Form.get('password')?.value ===
      this.registerFormPresenter.Form.get('confirmarPassword')?.value;
  }

  get passwordControl() {
    return this.registerFormPresenter.Form.get('password');
  }

  get confirmPasswordControl() {
    return this.registerFormPresenter.Form.get('confirmarPassword');
  }
}
