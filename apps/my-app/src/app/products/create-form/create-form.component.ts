import {Component, OnInit} from '@angular/core';
import {Category, Product} from "@find-a-buddy/data";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.api.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit {
  product: any = {
    name: '',
    description: '',
    price: 0,
    quantity:0,
    image: '',
    category: [],
 };

  categories = new FormControl('');
  categoryList: string[] = [];
  selectedCategories: Category[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _productService: ProductService,
  ) {}

  ngOnInit(): void {
  }

  create() {
    console.log(this.product);
    this._productService.createProduct(this.product).subscribe(
        (data) => {
            console.log(data);
            this.router.navigate(['/sellers']);
        }
    );
  }

  sendData($event: any) {
    this.product.category = $event;
    console.log(this.product + $event + "got the data from child!");
  }
}