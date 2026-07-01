import { Component, OnInit } from '@angular/core';
import { RegisterFormPresenter } from './register-form.presenter';
import { RegisterFacade } from '../../../shared/patterns/facade/models/register-facade';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(
    public registerFormPresenter: RegisterFormPresenter,
    private registerFacade: RegisterFacade,
  ) { }

  // ==============================
  // UI
  // ==============================

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

  ngOnInit(): void {

    this.registerFormPresenter.createForm();

    this.registerFormPresenter.Form
      .get('password')
      ?.valueChanges
      .subscribe(password => {

        this.evaluatePassword(password ?? '');

      });

  }

  // ==============================
  // Mostrar Password
  // ==============================

  togglePassword(): void {

    this.showPassword = !this.showPassword;

  }

  toggleConfirmPassword(): void {

    this.showConfirmPassword = !this.showConfirmPassword;

  }

  // ==============================
  // Fortaleza Password
  // ==============================

  evaluatePassword(password: string): void {

    let score = 0;

    this.passwordRequirements.length =
      password.length >= 8;

    this.passwordRequirements.uppercase =
      /[A-Z]/.test(password);

    this.passwordRequirements.lowercase =
      /[a-z]/.test(password);

    this.passwordRequirements.number =
      /\d/.test(password);

    this.passwordRequirements.symbol =
      /[^A-Za-z0-9]/.test(password);

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

  // ==============================
  // Progreso del formulario
  // ==============================

  get formProgress(): number {

    const controls = this.registerFormPresenter.Form.controls;

    const total = Object.keys(controls).length;

    const valid = Object.values(controls)
      .filter(control => control.valid)
      .length;

    return Math.round((valid / total) * 100);

  }

  // ==============================
  // Registrar
  // ==============================

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

