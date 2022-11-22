import { Component, OnInit , OnDestroy} from '@angular/core';
import {UserService} from "../authentication/user.service";
import {environment} from "../../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import { AuthService } from '@find-a-buddy/auth-ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {
  users: any = [];

  BASE_URL = environment.apiUrl;


  constructor(
    private _user: UserService,
    private apiService: HttpClientModule
  ) { }

  ngOnInit(): void {
    this.users = this._user.getUsers();


  }



  ngOnDestroy(): void {
    console.log("home component destroyed");
  }



}
