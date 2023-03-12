export class LoginRequest {
  public name: string;
  public password: string;

  constructor(username: string, password: string) {
    this.name = username;
    this.password = password;
  }
}
