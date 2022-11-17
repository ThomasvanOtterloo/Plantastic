
export enum Gender {
  male = "male",
  female= "female",

}

export class User {
  id: number | undefined;
  email: string | undefined;
  password: string | undefined;
  Gender: Gender | undefined;

  constructor(id: number, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

}
