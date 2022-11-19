import { Component, OnInit } from '@angular/core';
import {User} from "../component-user-model";
import {UserService} from "../user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  constructor(
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    if (this.password === this.confirmPassword) {
      this.user!.password = this.password;
      this._userService.create(this.user!);
      this.router.navigate(['/sellers']);
    } else {
      console.log('Passwords do not match');
    }
  }


}
