import { Component, OnInit } from '@angular/core';
import {User} from "../component-user-model";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
// import {AuthService} from "@find-a-buddy/auth-ui";
// import {Subscription} from "rxjs";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User = new User(0, '', '');
  public password: string | undefined;
  public confirmPassword: string | undefined;
  public passwordsMatch: boolean = true;
  // subs!: Subscription;

  constructor(
    private _userService: UserService,
    private router: Router,

  ) {
  }

  ngOnInit(): void {


  }

  register() {
    console.log(this.user.password + ' ' + this.confirmPassword);
    if (this.user.password === this.confirmPassword) {
      this.user!.password = this.password;
      this._userService.create(this.user!);
      this.passwordsMatch = true;
      this.router.navigate(['/sellers']);
    } else {
      console.log('Passwords do not match');
      this.passwordsMatch = false;
      console.log(this.passwordsMatch);
    }
  }



}
