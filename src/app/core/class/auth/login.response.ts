export class LoginResponse {

  token: string;
  tipo: string;
  expiraEnMs: number;
  usuarioSistema: string;
  rol: string;

  constructor(data: Partial<LoginResponse> = {}) {

    this.token = data.token ?? '';
    this.tipo = data.tipo ?? '';
    this.expiraEnMs = data.expiraEnMs ?? 0;
    this.usuarioSistema = data.usuarioSistema ?? '';
    this.rol = data.rol ?? '';

  }

  static fromJson(json: unknown): LoginResponse {

    const r = json as Record<string, unknown>;

    return new LoginResponse({
      token: r['token'] as string,
      tipo: r['tipo'] as string,
      expiraEnMs: r['expiraEnMs'] as number,
      usuarioSistema: r['usuarioSistema'] as string,
      rol: r['rol'] as string
    });

  }
}