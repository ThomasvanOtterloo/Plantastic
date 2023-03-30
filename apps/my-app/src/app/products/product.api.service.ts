import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {UserInfo} from "@find-a-buddy/data";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {switchMap} from "rxjs/operators";
import {Product} from "@find-a-buddy/data";
import {AlertService, ConfigService} from "@find-a-buddy/util-ui";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public currentUser$ = new BehaviorSubject<UserInfo | undefined>(undefined);
    private readonly CURRENT_USER = 'currentuser';


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
        return this.http.post<Product>(`product`, product, );
    }

    getAllProducts(): Observable<Array<Product>> {
        return this.http.get<ProductsBody>(`product`).pipe(
            map((body: ProductsBody) => body.results),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }
    getProductById(id: string): Observable<Array<Product>> {
        const test = this.http.get<ProductsBody>(`product/${id}`).pipe(
            map((body: ProductsBody) => body.results),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
        console.log('test', test);
        return test
    }

    deleteProduct(id: string) {
        return this.http.delete(`product/${id}`);
    }

    updateProduct(product: Product) {
        return this.http.patch(`product/${product.id}`, product);
    }

    // @Output() searchEvent = new EventEmitter<string>();


    public handleError(error: HttpErrorResponse): Observable<any> {
        if (error.status === 401) {
            this.alertService.error('Unauthorized');
            this.router.navigate(['/login']);
        } else {
            this.alertService.error('Something went wrong');
        }
        return of(undefined);
    }




}

export interface ProductsBody {
    results: Array<Product>
}

