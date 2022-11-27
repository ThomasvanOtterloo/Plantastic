import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {ReviewService} from "../review.service";
import {Product} from "../component-product-model";
import {Review} from "../component-review-model";
import {AuthService} from "@find-a-buddy/auth-ui";
import {of, Subscription, switchMap, tap} from "rxjs";
import {UserInfo} from "@find-a-buddy/data";
import {UserService} from "../../authentication/user.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {
  editMode = false;
  loggedinUser = 'Thomas';
  product: Product | undefined;
  reviewsOfProduct: Review [] = [];
  newRating: any;
  description: any;

  subscriptionParams!: Subscription;
  user!: UserInfo;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private _reviewService: ReviewService,
    private _productService: ProductService
  ) {}




  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.product = this._productService.getProductById(params.get('id')!);
    });
    console.log(this.product);
    this.GetReviews();




  }


  GetReviews() {
    this.reviewsOfProduct = this._reviewService.getReviewsByProductId(this.product!.id);
  }

  CreateReview() {
    console.log('Create Review');






     let Review : Review = {
      id: 11,
       authorId: this.loggedinUser,
      productId: this.product!.id,
      rating: this.newRating,
      description: this.description,

       dateCreated: new Date(),
    }
    console.log(Review);
    this._reviewService.createReview(Review).then(r => {
        this.GetReviews();
    });


  }
  DeleteReview(id?: number) {
    console.log('Delete Review');
    this._reviewService.deleteReview(id);
    this.GetReviews();
  }

  saveReview(review: Review) {
    this.editMode = false;
    review.rating = this.newRating;
    // this._reviewService.saveReview(this.product!.id, this.loggedinUser, this.product!.rating, this.product!.review);
    this._reviewService.saveReview(review);


  }
}
