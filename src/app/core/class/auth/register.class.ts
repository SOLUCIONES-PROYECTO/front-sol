import { AuthCredentials } from './auth-credentials.class';

export class Register extends AuthCredentials {

  nombres: string;
  apellidos: string;
  dni: string;
  direccion: string;
  fechaNacimiento: string;
  telefono: string;
  genero: string;

  confirmarPassword: string;

  constructor(register: Partial<Register> = {}) {

    super(register);

    this.nombres = register.nombres || '';
    this.apellidos = register.apellidos || '';
    this.dni = register.dni || '';
    this.direccion = register.direccion || '';
    this.fechaNacimiento = register.fechaNacimiento || '';
    this.telefono = register.telefono || '';
    this.genero = register.genero || '';

    this.confirmarPassword = register.confirmarPassword || '';

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
      password: register.password,
      confirmarPassword: register.confirmarPassword,

    };

  }

}