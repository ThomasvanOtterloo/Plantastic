

export class User {
  id: number | undefined;
  username: string | undefined;
  password: string | undefined;
  wallet: number | undefined;

  constructor(id: number, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }


}
