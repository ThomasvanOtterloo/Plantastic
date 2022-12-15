import { Injectable } from '@angular/core';
import {Product, Review} from "@find-a-buddy/data";
import {UserInfo} from "@find-a-buddy/data";
import {AlertService, ConfigService} from "@find-a-buddy/util-ui";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Order} from "@find-a-buddy/data";
import {ProductsBody} from "../product.api.service";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public currentUser$ = new BehaviorSubject<UserInfo | undefined>(undefined);


    constructor(
        private configService: ConfigService,
        private alertService: AlertService,
        private http: HttpClient,
        private router: Router
    ) { }

    createOrder(order: Order) {
        return this.http.post<Review>(`order`, order);
    }

    getOrders():Observable<any[]> {
        return this.http.get<OrderBody>(`order/self`).pipe(
            map((body: OrderBody) => body.results)


        );
    }
}



export interface OrderBody {
    results: Array<Order>
    product: Product
}

