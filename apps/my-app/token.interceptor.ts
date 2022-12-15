import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {UserInfo} from "@find-a-buddy/data";
import {switchMap} from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public currentUser$ = new BehaviorSubject<UserInfo | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.getUserFromLocalStorage()
        .pipe(
            // switchMap is overbodig als we validateToken() niet gebruiken...
            switchMap((user: UserInfo | undefined) => {
              if (user) {
                console.log('User found in local storage working in intercept');
                this.currentUser$.next(user);
                console.log('token: >' ,this.currentUser$.value?.token);
                // return this.validateToken(user);
                return of(user);
              } else {
                console.log(`No current user found`);
                return of(undefined);
              }
            })
        )
        .subscribe(() => console.log('Startup auth done'));

    const newRequest = request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${this.currentUser$.value?.token}`,
      }),
      url: `http://localhost:3333/data-api/${request.url}`
    });
    return next.handle(newRequest);
  }

  getUserFromLocalStorage(): Observable<UserInfo | undefined> {
    const userData = localStorage.getItem(this.CURRENT_USER);
    if (userData) {
      const localUser = JSON.parse(userData);
      return of(localUser);
    } else {
      return of(undefined);
    }
  }
}
