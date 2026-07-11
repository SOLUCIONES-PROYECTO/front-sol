import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  token: string = '';
  tokenValido: boolean = false;
  
  nuevaContrasena: string = '';
  showPassword = false;
  isLoading = false;
  success = false;

  notification: { type: 'success' | 'error' | 'info'; message: string } | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authApi: AuthApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        this.token = params['token'];
        this.tokenValido = true;
      }
    });
  }

  resetear(): void {
    console.log("1. Función resetear() iniciada");
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    
    if (this.nuevaContrasena.length < 8) {
      console.log("2. Falló longitud < 8");
      this.notification = { type: 'error', message: 'La contraseña debe tener al menos 8 caracteres.' };
      return;
    }
    if (!passwordRegex.test(this.nuevaContrasena)) {
      console.log("2. Falló regex de contraseña segura");
      this.notification = { type: 'error', message: 'La contraseña debe incluir al menos una mayúscula, un número y un carácter especial.' };
      return;
    }

    console.log("3. Contraseña válida, iniciando isLoading = true");
    this.isLoading = true;
    this.notification = null;

    try {
      console.log("4. Llamando a authApi.resetPassword...");
      this.authApi.resetPassword(this.token, this.nuevaContrasena).subscribe({
        next: (res: any) => {
          console.log("5. NEXT callback ejecutado con respuesta:", res);
          this.isLoading = false;
          this.success = true;
          this.tokenValido = false; // Oculta el form
          this.notification = {
            type: 'success',
            message: res.mensaje || 'Contraseña actualizada correctamente.'
          };
          this.cdr.detectChanges(); // Forzar actualización visual
        },
        error: (err: any) => {
          console.error("5. ERROR callback ejecutado:", err);
          this.isLoading = false;
          this.notification = {
            type: 'error',
            message: err.error?.message || err.error?.mensaje || 'Error al restablecer la contraseña. El enlace pudo haber expirado.'
          };
          this.cdr.detectChanges(); // Forzar actualización visual
        }
      });
      console.log("4.1 Subscribe llamado exitosamente");
    } catch (e) {
      console.error("Error síncrono en resetPassword:", e);
      this.isLoading = false;
      this.cdr.detectChanges(); // Forzar actualización visual
    }
    
    // Seguro en caso de que el observable se cuelgue por alguna razón extraña de red
    setTimeout(() => {
      console.log("6. Timeout de 5s ejecutado. isLoading actual es:", this.isLoading);
      if (this.isLoading) {
        console.log("7. isLoading seguía en true. Forzando a false.");
        this.isLoading = false;
        this.notification = { type: 'error', message: 'Tiempo de espera agotado. Revisa que el backend esté encendido.' };
        this.cdr.detectChanges(); // Forzar actualización visual
      }
    }, 5000);
  }
}
