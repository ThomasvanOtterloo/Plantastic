import { Injectable } from '@angular/core';
import {Product} from "./component-product-model";
import {Review} from "./component-review-model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviews: Review [] = [
      {
        id: 1,
        productId: 1,
        authorId: "John Doe",
        description: "This is a review of the product.",
        dateCreated: new Date(),
        rating: 7,
      },
      {
        id: 2,
        productId: 1,
        authorId: "Marky Parky",
        description: "This is a review of the product.",
        dateCreated: new Date(),
        rating: 7,
      },
      {
        id: 3,
        productId: 2,
        authorId: "Klaas Heuvels",
        description: "This is a review of the product.",
        dateCreated: new Date(),
        rating: 7,
      },
      {
        id: 4,
        productId: 2,
        authorId: "Jan weer",
        description: "This is a review of the product.",
        dateCreated: new Date(),
        rating: 7,
      }
    ];

  constructor() { }

  getReviewsByProductId(id: any) {
    let reviewsOfProduct: Review [] = [];
    this.reviews.forEach((review) => {
      if (review.productId === id) {
        review.dateCreated = this.formatReviewDate(review.dateCreated);
        reviewsOfProduct.push(review);
      }
    });
    return reviewsOfProduct;
  }

  createReview(review: Review) {
    return new Promise((resolve) => {
      this.reviews.push(review);
        resolve(true);

    });
  }

  deleteReview(id?: number) {
    let index = this.reviews.findIndex((review) => review.id === id);
    console.log(index);
    this.reviews.splice(index, 1);
    console.log(this.reviews);
  }

  formatReviewDate(date: Date) {
    return date.toLocaleString('en-us',{month:'short', year:'numeric', day:'numeric'})
  }

  saveReview(review: Review) {
    let index = this.reviews.findIndex((r) => r.id === review.id);
    this.reviews[index] = review;
  }
}
