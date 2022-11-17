import {Injectable} from '@angular/core';
import {Gender, User} from "./component-user-model";

@Injectable({
  providedIn: 'root'
})



export class UserService {
  users: User [] = [
    {
      id: 1,
      email: 'John@gmail.com',
      password: '123456',
      Gender : Gender.male
    },
    {
      id: 2,
      email: 'kees@gmail.com',
      password: '123456',
      Gender : Gender.male
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



}
