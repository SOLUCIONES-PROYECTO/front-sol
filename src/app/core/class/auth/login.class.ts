import { AuthCredentials } from './auth-credentials.class';

export class Login extends AuthCredentials {
  

  constructor(login: Partial<Login> = {}) {
    super(login);
  }

  static fromJson(login: unknown): Login {
    return new Login(AuthCredentials.FromJson(login));
  }

  static toJson(login: Login): unknown {
    return {
      email: login.email,
      password: login.password,
    };
  }
  
}
