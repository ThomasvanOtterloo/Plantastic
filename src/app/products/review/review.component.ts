import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {ReviewService} from "../review.service";
import {Product} from "../component-product-model";
import {Review} from "../component-review-model";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  editMode = false;

  product: Product | undefined;
  reviewsOfProduct: Review [] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _reviewService: ReviewService,
    private _productService: ProductService
  ) {}



  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.product = this._productService.getProductById(params.get('id')!);
    });
    console.log(this.product);
    this.GetReviews();
    console.log(this.reviewsOfProduct);
  }

  GetReviews() {
    this.reviewsOfProduct = this._reviewService.getReviewsByProductId(this.product!.id);
  }


  CreateReview() {

  }
  DeleteReview() {
    console.log('Delete Review');
  }
}
