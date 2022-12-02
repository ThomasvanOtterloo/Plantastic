import { Injectable } from '@angular/core';
import {Product} from "./component-product-model";
import {Review} from "@find-a-buddy/data";
import {BehaviorSubject} from "rxjs";
import {UserInfo} from "@find-a-buddy/data";
import {AlertService, ConfigService} from "@find-a-buddy/util-ui";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  public currentUser$ = new BehaviorSubject<UserInfo | undefined>(undefined);


  constructor(
      private configService: ConfigService,
      private alertService: AlertService,
      private http: HttpClient,
      private router: Router
  ) { }

  // getReviewsByProductId(id: any) {
  //   let reviewsOfProduct: Review [] = [];
  //   this.reviews.forEach((review) => {
  //     if (review.productId === id) {
  //       review.dateCreated = this.formatReviewDate(review.dateCreated);
  //       reviewsOfProduct.push(review);
  //     }
  //   });
  //   return reviewsOfProduct;
  // }

  createReview(review: Review, productId: string) {
    return this.http.post<Review>(`review/${productId}`, review);
  }

  deleteReview(id?: string) {
    return this.http.delete(`review/${id}`);
  }

  formatReviewDate(date: Date) {
    return date.toLocaleString('en-us',{month:'short', year:'numeric', day:'numeric'})
  }

  saveReview(review: Review) {
    console.log('adasdasd',review);
    console.log(review);
    return this.http.patch<Review>(`review/${review.id}`, review);


  }
}
