import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {UserInfo} from "@find-a-buddy/data";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {switchMap} from "rxjs/operators";
import {Product} from "@find-a-buddy/data";
import {AlertService, ConfigService} from "@find-a-buddy/util-ui";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    readonly url = `http://localhost:3333/auth-api/`;
    public currentUser$ = new BehaviorSubject<UserInfo | undefined>(undefined);
    private readonly CURRENT_USER = 'currentuser';
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(
        private configService: ConfigService,
        private alertService: AlertService,
        private http: HttpClient,
        private router: Router
    ) {
        console.log('AuthService constructor');
        // Check of we al een ingelogde user hebben
        // Zo ja, check dan op de backend of het token nog valid is.
        // Het token kan namelijk verlopen zijn. Indien verlopen
        // retourneren we meteen een nieuw token.
        this.getUserFromLocalStorage()
            .pipe(
                // switchMap is overbodig als we validateToken() niet gebruiken...
                switchMap((user: UserInfo | undefined) => {
                    if (user) {
                        console.log('User found in local storage');
                        this.currentUser$.next(user);
                        // return this.validateToken(user);
                        return of(user);
                    } else {
                        console.log(`No current user found`);
                        return of(undefined);
                    }
                })
            )
            .subscribe(() => console.log('Startup auth done'));
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

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.url}product`, product, {
            headers: this.headers,
        });
    }






}