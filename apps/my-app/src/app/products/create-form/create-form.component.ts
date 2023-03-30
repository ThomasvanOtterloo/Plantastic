import {Component, OnInit} from '@angular/core';
import {Category, Product} from "@find-a-buddy/data";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.api.service";
import {FormControl} from "@angular/forms";
import {AlertService} from "@find-a-buddy/util-ui";

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
    success: any;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _productService: ProductService,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
  }

  create() {
    console.log(this.product);
    this._alertService.success('Product created!');
    this._productService.createProduct(this.product).subscribe(
        (data) => {
            console.log('success', data);
            this.success = true;
            this.router.navigate(['/sellers']);
        }
    );
  }

  sendData($event: any) {
    this.product.category = $event;
    console.log(this.product + $event + "got the data from child!");
  }
}

