import { Injectable } from '@angular/core';
import {Product} from "./component-product-model";
import {Review} from "./component-review-model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviews: Review [] = [
      {
        productId: 1,
        author: "John Doe",
        description: "This is a review of the product.",
        dateCreated: new Date(),
        rating: 7,
      },
      {
        productId: 1,
        author: "Marky Parky",
        description: "This is a review of the product.",
        dateCreated: new Date(),
        rating: 7,
      },
      {
        productId: 2,
        author: "Klaas Heuvels",
        description: "This is a review of the product.",
        dateCreated: new Date(),
        rating: 7,
      },
      {
        productId: 2,
        author: "Jan weer",
        description: "This is a review of the product.",
        dateCreated: new Date(),
        rating: 7,
      }
    ];


  constructor() { }


  getReviewsByProductId(id: any) {
    return this.reviews.filter((Review) => Review.productId === id);
  }

  createReview(review: Review) {
    return new Promise((resolve) => {
      this.reviews.push(review);
    });
  }

  deleteReview(review: Review) {
    let index = this.reviews.findIndex((Review) => Review.author === review.author);
    this.reviews.splice(index, 1);
  }


}
