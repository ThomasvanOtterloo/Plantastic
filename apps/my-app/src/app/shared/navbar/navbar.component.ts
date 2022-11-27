import { Component } from '@angular/core';
import {AuthService} from "@find-a-buddy/auth-ui";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  message = 'Plantastic';
  isLoggedIn = false;


  constructor(
      public authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  logout() {
    this.authService.logout()
  }
}


