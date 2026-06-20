export class Empleado {

  idEmpleado: number;
  idPersona: number;

  nombre: string;
  apellido: string;

  usuarioSistema: string;
  rol: string;
  cargo: string;
  area: string;
  estado: string;

  constructor(empleado: Partial<Empleado> = {}) {

    this.idEmpleado = empleado.idEmpleado ?? 0;
    this.idPersona = empleado.idPersona ?? 0;

    this.nombre = empleado.nombre ?? '';
    this.apellido = empleado.apellido ?? '';

    this.usuarioSistema = empleado.usuarioSistema ?? '';
    this.rol = empleado.rol ?? '';
    this.cargo = empleado.cargo ?? '';
    this.area = empleado.area ?? '';
    this.estado = empleado.estado ?? '';
  }

  static fromJson(empleado: unknown): Empleado {

    const casted = empleado as Record<string, unknown>;

    return new Empleado({
      idEmpleado: casted['idEmpleado'] as number,
      idPersona: casted['idPersona'] as number,

      nombre: casted['nombre'] as string,
      apellido: casted['apellido'] as string,

      usuarioSistema: casted['usuarioSistema'] as string,
      rol: casted['rol'] as string,
      cargo: casted['cargo'] as string,
      area: casted['area'] as string,
      estado: casted['estado'] as string
    });

  }
}