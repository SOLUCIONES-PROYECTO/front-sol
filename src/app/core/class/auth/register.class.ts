import { AuthCredentials } from './auth-credentials.class';

export class Register extends AuthCredentials {

  nombres: string;
  apellidos: string;
  dni: string;
  direccion: string;
  fechaNacimiento: string;
  telefono: string;
  genero: string;
  correo: string;
  confirmarPassword: string;
  cargo: string;
  area: string;

  constructor(register: Partial<Register> = {}) {
    super(register);

    this.nombres = register.nombres || '';
    this.apellidos = register.apellidos || '';
    this.dni = register.dni || '';
    this.direccion = register.direccion || '';
    this.fechaNacimiento = register.fechaNacimiento || '';
    this.telefono = register.telefono || '';
    this.genero = register.genero || '';
    this.correo = register.correo || '';
    this.confirmarPassword = register.confirmarPassword || '';
    this.cargo = register.cargo || '';
    this.area = register.area || '';
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
      correo: casted['correo'] as string,
      password: casted['password'] as string,
      confirmarPassword: casted['confirmarPassword'] as string,
      usuarioSistema: casted['usuarioSistema'] as string,
      cargo: casted['cargo'] as string,
      area: casted['area'] as string,
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
      correo: register.correo,
      password: register.password,
      usuarioSistema: register.usuarioSistema,
      cargo: register.cargo || 'Sin asignar',
      area: register.area || 'Sin asignar',
    };
  }
}
