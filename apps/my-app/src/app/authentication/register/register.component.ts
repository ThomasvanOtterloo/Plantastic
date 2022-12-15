import { Component, OnInit } from '@angular/core';
import {User} from "../component-user-model";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AuthService} from "@find-a-buddy/auth-ui";
import {UserRegistration} from "@find-a-buddy/data";
// import {AuthService} from "@find-a-buddy/auth-ui";
// import {Subscription} from "rxjs";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(
    private _userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
  }


  ngOnInit(): void {

  }


  user: UserRegistration = {
    username: '',
    password: '',
  }
  confirmPassword: string = 'Secret123$'
  passwordsMatch: boolean = true;
  register() {
    console.log(this.user.password + ' ' + this.confirmPassword);

    if (this.user.password === this.confirmPassword) {

      this.authService.register(this.user).subscribe((user) => {
        if (user) {
          console.log('register succeeded');
          this.router.navigate(['/login']);
        } else {
          console.log('register failed');
        }
      });
      this.passwordsMatch = true;
      this.router.navigate(['/login']);
    } else {
      console.log('Passwords do not match');
      this.passwordsMatch = false;
      console.log(this.passwordsMatch);
    }
  }



}
