import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PasswordValidator(
  passwordKey: string,
  confirmPasswordKey: string
) {

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get(passwordKey)?.value;
    const confirmarPassword = form.get(confirmPasswordKey)?.value;

    if (!password || !confirmarPassword) {
      return null;
    }

    if (password && !passwordRegex.test(password)) {
      return { weakPassword: true };
    }

    if (password && confirmarPassword && password !== confirmarPassword) {
      return { passwordMismatch: true };
    }

    return null;
  };
}


