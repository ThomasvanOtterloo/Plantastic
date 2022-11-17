import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../component-product-model";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  componentId: string | null | undefined;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    /**
     * We gebruiken de EditComponent om een bestaande record te wijzigen
     * én om een nieuwe record te maken.
     * Een bestaande record heeft een :id in de URL, bv '/users/1/edit'
     * Als die er dus is gaan we de user ophalen en bewerken.
     * Als er geen :id in de URL zit (via '/users/new') maken we een nieuwe record.
     */
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get("id");
      if (this.componentId) {
        // Bestaande user
        console.log("Bestaande component");
        this.product = this._productService.getProductById(this.componentId);
      } else {
        // Nieuwe user
        console.log("Nieuwe component");
      }
    });
  }

  delete() {
    if (this.componentId) {
      console.log("Verwijderen van component met id: " + this.componentId);
          this._productService.deleteProductById(this.componentId);
          this.router.navigate(['/sellers']).then(r => console.log(r));
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
}
