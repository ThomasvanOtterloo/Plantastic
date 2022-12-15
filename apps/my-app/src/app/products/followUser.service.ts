import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {User, UserInfo} from "@find-a-buddy/data";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {switchMap} from "rxjs/operators";
import {Product} from "@find-a-buddy/data";
import {AlertService, ConfigService} from "@find-a-buddy/util-ui";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class FollowUserService {
    public currentUser$ = new BehaviorSubject<UserInfo | undefined>(undefined);
    private readonly CURRENT_USER = 'currentuser';
    public readonly allFollowers$: Observable<User[]>;



    constructor(
        private configService: ConfigService,
        private alertService: AlertService,
        private http: HttpClient,
        private router: Router
    ) {
        this.getUserFromLocalStorage()
            .pipe(
                // switchMap is overbodig als we validateToken() niet gebruiken...
                switchMap((user: UserInfo | undefined) => {
                    if (user) {
                        console.log('User found in local storage');
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

        this.allFollowers$ = this.http.get<FollowersBody>('follow').pipe(
            map((body: FollowersBody): User[] => body.results));
    }

    getAllFollowers(): Observable<Array<User>> {
        return this.http.get<FollowersBody>(`follow`, ).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error)),
            map((body: FollowersBody) => body.results), //hoped body.results.following would work but it doesn't.

        );
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



    followUser(userId?: string): Observable<Array<User>> {
        return this.http.post<FollowersBody>(`follow`, {username: userId}).pipe(
            map((body: FollowersBody) => body.results),
            map((users: User[]) => users.map((user: User) => user.following)),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    unfollowUser(username?: string): Observable<FollowersBody> {
        return this.http.delete<FollowersBody>(`follow/${username}`, {});
    }


    public handleError(error: HttpErrorResponse): Observable<any> {
        if (error.status === 401) {
            this.alertService.error('Unauthorized');
            this.router.navigate(['/login']);
        } else {
            this.alertService.error('Something went wrong');
        }
        return of(undefined);
    }

    public getFollowersInterests(): Observable<Product[]> {
        return this.http.get<FollowersProductsBody>(`follow/interests`, {})
            .pipe(
                catchError((error: HttpErrorResponse) => this.handleError(error)),
                map((body: FollowersProductsBody) => body.results),
            );
    }
}

export interface FollowersBody {
    results: Array<User>
}

export interface FollowersProductsBody {
    results: Array<Product>
}

