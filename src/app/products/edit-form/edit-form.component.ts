import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Category, Product} from "../component-product-model";


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
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.product = this._productService.getProductById(params.get('id')!);
    });
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
