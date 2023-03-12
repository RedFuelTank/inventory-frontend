export class LoginResponse {
  public username : string;
  public token : string;
  public authority : Authority[];


  constructor(username: string, token: string, role : string) {
    this.username = username;
    this.token = token;
    this.authority = role.split(", ") as Authority[];
  }
}

export enum Authority {
  Business = "BUSINESS",
  Representative = "REPRESENTATIVE"
}
