export abstract class AuthCredentials {
  email: string;
  password: string;

  constructor(authCredentials: Partial<AuthCredentials> = {}) {
    this.email = authCredentials.email || '';
    this.password = authCredentials.password || '';
  }

  static FromJson(authCredentials: unknown): Partial<AuthCredentials> {
    const casted = authCredentials as Record<string, unknown>;
    return {
      email: casted['email'] as string,
      password: casted['password'] as string,
    };
  }
  
}
