import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product, UserInfo} from "@find-a-buddy/data";
import {ProductService} from "../product.api.service";
import {MatDialog} from '@angular/material/dialog';
import {OrderDialogComponent} from "../order-dialog/order-dialog.component";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  componentId: string | null | undefined;
  product: any;
  localUser!: UserInfo;

  isFollowed: boolean = false;
  followState:string = "Follow";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _productService: ProductService,
    public dialog: MatDialog
  ) {}



  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get("id");
      if (this.componentId) {
        // Bestaande user
        console.log("Bestaande component");
        this.product = this._productService.getProductById(this.componentId).subscribe(
            response => {
                this.product = response;
                console.log('this product',this.product);
            }
        );
      } else {
        // Nieuwe user
        console.log("Nieuwe component");
      }
    });

    const userData = localStorage.getItem('currentuser');
    if (userData) {
      this.localUser = JSON.parse(userData);
      console.log('local user', this.localUser);
    }

  }


  delete() {
    if (this.componentId) {
      console.log("Verwijderen van component met id: " + this.componentId);
          this._productService.deleteProduct(this.componentId).subscribe(
                response => {
                    console.log('response',response);
                    this.router.navigate(['/sellers']).then(r => console.log(r));
                }
          );
        } else {
          console.log("Geen id");
        }
  }


  edit() {
    if (this.componentId) {
      console.log("Wijzigen van component met id: " + this.componentId);
      this.router.navigate(['/sellers','edit', this.componentId,]).then(r => console.log(r));
    } else {
      console.log("Geen id");
    }
  }

  OpenPopUp() {
    console.log("OpenPopUp");
  }

  openDialog() {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '250px',
      data: {Product: this.product}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onReviewChange($event: Product[]) {
    console.log($event);
    this.product = $event;
  }

  getAvgRating() {
    return this.product.reviews.map((review: any) => {
      return review.rating;
    }).reduce((a: number, b: number) => a + b, 0) / this.product.reviews.length;
  }


}
