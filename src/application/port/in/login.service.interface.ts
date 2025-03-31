export interface LoginSvc {
  login(command: LoginCommand): Promise<LoginResult>;
}

export class LoginCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

// refreshToken은 미고려
export class LoginResult {
  constructor(public readonly accessToken: string) {}
}
