export class Empleado {

  // Empleado
  idEmpleado: number;

  cargo: string;
  area: string;
  estado: string;
  rol: string;
  usuarioSistema: string;
  turnoTrabajo: string;
  supervisorDirecto: string;
  fechaContratacion: string;

  // Persona
  idPersona: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  correo: string;

  constructor(empleado: Partial<Empleado> = {}) {

    this.idEmpleado = empleado.idEmpleado ?? 0;

    this.cargo = empleado.cargo ?? '';
    this.area = empleado.area ?? '';
    this.estado = empleado.estado ?? '';
    this.rol = empleado.rol ?? '';
    this.usuarioSistema = empleado.usuarioSistema ?? '';
    this.turnoTrabajo = empleado.turnoTrabajo ?? '';
    this.supervisorDirecto = empleado.supervisorDirecto ?? '';
    this.fechaContratacion = empleado.fechaContratacion ?? '';

    this.idPersona = empleado.idPersona ?? 0;
    this.nombre = empleado.nombre ?? '';
    this.apellido = empleado.apellido ?? '';
    this.dni = empleado.dni ?? '';
    this.telefono = empleado.telefono ?? '';
    this.correo = empleado.correo ?? '';
  }

  static fromJson(empleado: unknown): Empleado {

    const casted = empleado as Record<string, unknown>;

    return new Empleado({

      idEmpleado: casted['idEmpleado'] as number,

      cargo: casted['cargo'] as string,
      area: casted['area'] as string,
      estado: casted['estado'] as string,
      rol: casted['rol'] as string,
      usuarioSistema: casted['usuarioSistema'] as string,
      turnoTrabajo: casted['turnoTrabajo'] as string,
      supervisorDirecto: casted['supervisorDirecto'] as string,
      fechaContratacion: casted['fechaContratacion'] as string,

      idPersona: casted['idPersona'] as number,
      nombre: casted['nombre'] as string,
      apellido: casted['apellido'] as string,
      dni: casted['dni'] as string,
      telefono: casted['telefono'] as string,
      correo: casted['correo'] as string

    });

  }

  static toJson(empleado: Empleado): unknown {

    return {

      idPersona: empleado.idPersona,

      cargo: empleado.cargo,
      area: empleado.area,
      fechaContratacion: empleado.fechaContratacion,

      estado: empleado.estado,
      rol: empleado.rol,

      usuarioSistema: empleado.usuarioSistema,

      turnoTrabajo: empleado.turnoTrabajo,
      supervisorDirecto: empleado.supervisorDirecto

    };

  }

}