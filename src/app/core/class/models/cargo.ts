export class Cargo {

  idCargo: number;
  nombre: string;

  constructor(cargo: Partial<Cargo> = {}) {
    this.idCargo = cargo.idCargo ?? 0;
    this.nombre = cargo.nombre ?? '';
  }

  static fromJson(cargo: unknown): Cargo {
    const casted = cargo as Record<string, unknown>;
    return new Cargo({
      idCargo: casted['idCargo'] as number,
      nombre: casted['nombre'] as string
    });
  }

  static toJson(cargo: Cargo): unknown {
    return {
      nombre: cargo.nombre
    };

  }

}