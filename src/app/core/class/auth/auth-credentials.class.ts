export abstract class AuthCredentials {
  usuarioSistema: string;
  password: string;

  constructor(authCredentials: Partial<AuthCredentials> = {}) {
    this.usuarioSistema = authCredentials.usuarioSistema || '';
    this.password = authCredentials.password || '';
  }

  static FromJson(authCredentials: unknown): Partial<AuthCredentials> {
    const casted = authCredentials as Record<string, unknown>;
    return {
      usuarioSistema: casted['usuarioSistema'] as string,
      password: casted['password'] as string,
    };
  }
  
}
