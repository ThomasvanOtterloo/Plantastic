import {Injectable} from '@angular/core';
import {User} from "./component-user-model";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  users: User [] = [
    {
      id: 1,
      username: 'John',
      password: '123456',
      wallet: 100,
    },
    {
      id: 2,
      username: 'kees',
      password: '123456',
      wallet: 100.55,
    }

  ];

  constructor() {
    console.log(  "component user model created");
  }

  public getUsers() {
    return this.users;
  }

  public getUserById(id: number): User  {
    return this.users.filter((user) => user.id === id)[0];
  }


  create(user: User) {
    this.users.push(user);
    console.log(this.users);

    console.log("user " +user+"created");
  }

  read(){
    return this.users;
  }


}
