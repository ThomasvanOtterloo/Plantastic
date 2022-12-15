import { Component , OnInit} from '@angular/core';
import {OrderService} from "../products/order-dialog/order.service";
import {Order} from "@find-a-buddy/data";
import {ProductService} from "../products/product.api.service";
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'find-a-buddy-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any | undefined = [];
  constructor(
    private orderService: OrderService,
  ) {}

    ngOnInit(): void {
        this.orderService.getOrders().pipe(
            map((orders: any) => {
                this.orders = orders;
                console.log(this.orders);
            }
        )).subscribe();
    }
}
