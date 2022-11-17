import { Component, OnInit , OnDestroy} from '@angular/core';
import {UserService} from "../authentication/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {
  users: any = [];


  constructor(private _user: UserService) { }

  ngOnInit(): void {
    this.users = this._user.getUsers();
  }



  ngOnDestroy(): void {
    console.log("home component destroyed");

  }



}
