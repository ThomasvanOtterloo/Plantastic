import { Component , OnInit} from '@angular/core';
import {OrderService} from "../products/order-dialog/order.service";
import {Order} from "@find-a-buddy/data";
import {ProductService} from "../products/product.api.service";
import { map, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'find-a-buddy-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any | undefined = [];
  constructor(
    private orderService: OrderService,
    private router: Router,
  ) {}

    ngOnInit(): void {
        this.orderService.getOrders().pipe(
            map((orders: any) => {
                this.orders = orders;
            }
        )).subscribe();
    }

    deleteOrder(orderId: string) {
        this.orderService.deleteOrder(orderId).subscribe(
            () => {
                console.log(`Order with id ${orderId} deleted successfully`);
                this.orderService.getOrders().pipe(
                    map((orders: any) => {
                            this.orders = orders;
                        }
                    )).subscribe();
            },
            (error) => {
                console.log(`Error deleting order: ${error}`);
            }
        );
    }
}
