import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../component-product-model";

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
  product: Product | undefined;
  wallet: number = 1000;
  quantity: number = 1;
  total: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.product = this.data.Product;
    console.log(this.product + "testing product");
    this.total = this.data.Product.price * this.quantity;
  }




  onNoClick(): void {
    this.dialogRef.close();
  }

}
