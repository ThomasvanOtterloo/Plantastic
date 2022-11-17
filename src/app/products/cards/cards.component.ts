import { Component, OnInit } from '@angular/core';
import {UserService} from "../../authentication/user.service";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  public user:any  = [];
  public category: any = [];
  public products: any = [];



  constructor(private _userService: UserService, private _productService: ProductService) { }
  ngOnInit(): void {
    this.user = this._userService.getUsers();
    this.products = this._productService.getProducts();
  }

  searchText: string = '';

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
    console.log(this.searchText);
  }

}
