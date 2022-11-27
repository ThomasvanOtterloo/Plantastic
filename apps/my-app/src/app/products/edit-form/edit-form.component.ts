import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Category, Product} from "../component-product-model";
import {of, switchMap, tap} from "rxjs";
import {UserInfo} from "@find-a-buddy/data";
import {AuthService} from "@find-a-buddy/auth-ui";


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.product = this._productService.getProductById(params.get('id')!);
    });

    this.authService.currentUser$.subscribe((user: UserInfo | undefined) => {
        if (user) {
            console.log(`User ${user.token} is logged in`);
        } else {
            console.log(`No user logged in`);
        }
    });


    // this.subscriptionParams = this.route.paramMap
    //     .pipe(
    //         tap(console.log),
    //         switchMap((params: ParamMap) => {
    //           // als we een nieuw item maken is er geen 'id'
    //           if (!params.get('id')) {
    //             return of({} as UserInfo);
    //           } else {
    //             console.log('paramsssssIdSs: '+params.get('id'));
    //             // return this.userService.read(params.get('id'));
    //             return of({} as UserInfo);
    //           }
    //         }),
    //         tap(console.log)
    //     )
    //     .subscribe((user: UserInfo) => {
    //       console.log('userssss', user);
    //       this.user = user;
    //
    //
    //     });
  }

  UpdateProduct() {
    this._productService.save(this.product!).then(() => {
      this.router.navigate(['/sellers']);
    });
  }

    getSelectedValues($event: Category[]) {
        this.product!.category = $event;
        console.log(this.product?.category  + "got the data from child!");
    }
}
