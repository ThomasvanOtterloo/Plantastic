import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "@find-a-buddy/auth-ui";
import {Router} from "@angular/router";
import {UserInfo, UserRegistration} from "@find-a-buddy/data";
import {HttpClientModule} from '@angular/common/http';
import {Subscription} from "rxjs";
import {Token} from "@angular/compiler";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit , OnDestroy{
    subs!: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }



    ngOnInit(): void {
        this.subs = this.authService.getUserFromLocalStorage()
            .subscribe((user:UserInfo | undefined) => {
                if (user) {
                    console.log('User found in local storage');
                    this.router.navigate(['/sellers']);
                } else {
                    console.log(`No current user found`);
                }
        });

    }

    ngOnDestroy(): void {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

    username: string = 'thomas';
    password: string = 'Secret123$';


    login() {
        const loginFormData: UserRegistration = {
            username: this.username,
            password: this.password,
        }
        this.authService
            .login(loginFormData)
            .subscribe((user) => {
                if (user) {
                    console.log('login succeeded');
                    this.router.navigate(['/']);
                } else {
                    console.log('login failed');
                }
            });



        // this.authService
        //     .setCurrentUser();
    }

}
