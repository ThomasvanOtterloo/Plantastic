import {Component, OnInit} from '@angular/core';
import {Category, Product} from "../component-product-model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {
  product: Product = { id: 0, name: '', description: '', quantity:0, price: 0, image: '', category: [], dateCreated: new Date() };

  categories = new FormControl('');
  categoryList: string[] = [];
  selectedCategories: Category[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
  }

  create() {
    console.log(this.product);
    this._productService.create(this.product).then(() => {
      this.router.navigate(['/sellers']);
    });
  }

  sendData($event: any) {
    this.product.category = $event;
    console.log(this.product + $event + "got the data from child!");
  }
}