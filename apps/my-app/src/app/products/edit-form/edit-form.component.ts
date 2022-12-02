import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../product.api.service";
import {Category} from "../component-product-model";
import {of, switchMap, tap} from "rxjs";
import {UserInfo} from "@find-a-buddy/data";
import {AuthService} from "@find-a-buddy/auth-ui";


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  product: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.product = this._productService.getProductById(params.get('id')!).subscribe((data) => {
        this.product = data;
        console.log(this.product);
      });
    });

    this.authService.currentUser$.subscribe((user: UserInfo | undefined) => {
        if (user) {
            console.log(`User ${user.token} is logged in`);
        } else {
            console.log(`No user logged in`);
        }
    });
  }

  UpdateProduct() {
    this._productService.updateProduct(this.product!).subscribe(
        (data) => {
            console.log(data);
            this.router.navigate(['/sellers']);
        }
    )
  }

    getSelectedValues($event: Category[]) {
        this.product!.category = $event;
        console.log(this.product?.category  + "got the data from child!");
    }

}
