import { AuthCredentials } from './auth-credentials.class';

export class Register extends AuthCredentials {

  nombres: string;
  apellidos: string;
  dni: string;
  direccion: string;
  fechaNacimiento: string;
  telefono: string;
  genero: string;
  contraseña:string;

  confirmarContraseña: string;

  constructor(register: Partial<Register> = {}) {

    super(register);

    this.nombres = register.nombres || '';
    this.apellidos = register.apellidos || '';
    this.dni = register.dni || '';
    this.direccion = register.direccion || '';
    this.fechaNacimiento = register.fechaNacimiento || '';
    this.telefono = register.telefono || '';
    this.genero = register.genero || '';
    this.contraseña = register.contraseña || '';
    this.confirmarContraseña = register.confirmarContraseña || '';

  }

  static fromJson(register: unknown): Register {

    const casted = register as Record<string, unknown>;

    return new Register({

      nombres: casted['nombres'] as string,
      apellidos: casted['apellidos'] as string,
      dni: casted['dni'] as string,
      direccion: casted['direccion'] as string,
      fechaNacimiento: casted['fechaNacimiento'] as string,
      telefono: casted['telefono'] as string,
      genero: casted['genero'] as string,
      email: casted['email'] as string,
      contraseña: casted['contraseña'] as string,
      confirmarContraseña: casted['confirmarContraseña'] as string,

    });

  }

  static toJson(register: Register): unknown {

    return {
      nombres: register.nombres,
      apellidos: register.apellidos,
      dni: register.dni,
      direccion: register.direccion,
      fechaNacimiento: register.fechaNacimiento,
      telefono: register.telefono,
      genero: register.genero,
      email: register.email,
      contraseña: register.contraseña,
      confirmarContraseña: register.confirmarContraseña,
    };

  }

}