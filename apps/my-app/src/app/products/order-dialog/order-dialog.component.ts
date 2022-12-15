import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../component-product-model";
import {OrderService} from "./order.service";
import {Order} from "@find-a-buddy/data";
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
  product: Product | undefined;
  wallet: number = 1000;
  quantity: number = 1;
    total: number = 0;

    order: Order = {
    productId: '',
    quantity: 0
    }


  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    private _orderService: OrderService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.total = this.data.Product.price * this.quantity;
    this.order.productId = this.data.Product.id;
  }


  ngOnInit(): void {
    this.product = this.data.Product;
    console.log(this.product + "testing product");

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeTt(e: any) {
      this.order.quantity = e.target.value;
    this.total = this.data.Product.price * e.target.value;
  }

  orderConfirm() {
    if (this.wallet >= this.total) {
        this._orderService.createOrder(this.order).subscribe(
            (res) => {
            console.log(res);
            this.dialogRef.close();
            this.router.navigate(['/order']);
        });

    } else {
        alert("Not enough money in your wallet");
    }

    this.dialogRef.close();
  }
}
