import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../product.api.service";
import {ReviewService} from "../review.service";
import {Product} from "@find-a-buddy/data";
import {Review} from "@find-a-buddy/data";
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
  reviewsOfProduct2: Review [] = [];
  newRating: any;
  description: any;

  subscriptionParams!: Subscription;
  localUser!: UserInfo;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private _reviewService: ReviewService,
    private _productService: ProductService
  ) {}

  @Input() reviewsOfProduct: any [] = [];
  @Input() productId!: string;
  @Output() onReviewChange = new EventEmitter<Product[]>();

  ngOnInit(): void {
      const userData = localStorage.getItem('currentuser');
      if (userData) {
          const localUser = JSON.parse(userData);
            this.localUser = localUser;
            console.log('local user', this.localUser);
      }

  }




  CreateReview() {
     let Review : any = {
      rating: this.newRating,
      description: this.description,
    }
    this._reviewService.createReview(Review, this.productId).subscribe(
        (data) => {
            console.log(data);
            this.onChange();
        })
  }

    saveReview(review: Review) {
      console.log('save review', review);
        this.editMode = false;
        review.rating = this.newRating;
        this._reviewService.saveReview(review).subscribe(
            (data) => {
                console.log(data)
                this.onChange();
            }
        );
    }






  DeleteReview(id?: string) {
    console.log('Delete Review');
    this._reviewService.deleteReview(id).subscribe(
        (data) => {
            console.log(data);
            this.onChange();
        }
    );
  }

    private onChange() {
        this._productService.getProductById(this.productId).subscribe(
            response => {
                this.onReviewChange.emit(response);
                console.log('product after chagne of review', this.onReviewChange);
            }
        );
    }

    formatReviewDate(date: Date) {
        const newdate = new Date(date);
        return newdate.toLocaleString('en-us',{month:'short', year:'numeric', day:'numeric'})
    }


}
