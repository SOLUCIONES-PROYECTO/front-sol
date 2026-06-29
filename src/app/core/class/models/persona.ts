export class Persona {

  idPersona: number;

  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  correo: string;
  direccion: string;

  fechaNacimiento: string;
  genero: string;

  fechaRegistro: string;

  constructor(persona: Partial<Persona> = {}) {

    this.idPersona = persona.idPersona ?? 0;

    this.nombre = persona.nombre ?? '';
    this.apellido = persona.apellido ?? '';
    this.dni = persona.dni ?? '';
    this.telefono = persona.telefono ?? '';
    this.correo = persona.correo ?? '';
    this.direccion = persona.direccion ?? '';

    this.fechaNacimiento = persona.fechaNacimiento ?? '';
    this.genero = persona.genero ?? '';

    this.fechaRegistro = persona.fechaRegistro ?? '';
  }

  static fromJson(persona: unknown): Persona {

    const casted = persona as Record<string, unknown>;

    return new Persona({

      idPersona: casted['idPersona'] as number,

      nombre: casted['nombre'] as string,
      apellido: casted['apellido'] as string,
      dni: casted['dni'] as string,
      telefono: casted['telefono'] as string,
      correo: casted['correo'] as string,
      direccion: casted['direccion'] as string,

      fechaNacimiento: casted['fechaNacimiento'] as string,
      genero: casted['genero'] as string,

      fechaRegistro: casted['fechaRegistro'] as string

    });

  }

  static toJson(persona: Persona): unknown {

    return {

      nombre: persona.nombre,
      apellido: persona.apellido,
      dni: persona.dni,
      telefono: persona.telefono,
      correo: persona.correo,
      direccion: persona.direccion,

      fechaNacimiento: persona.fechaNacimiento,
      genero: persona.genero

    };

  }

}