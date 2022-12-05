import { Component, OnInit } from '@angular/core';
import {UserService} from "../../authentication/user.service";

import {ProductService} from "../product.api.service";
import {FormControl} from "@angular/forms";
import {Category} from "../component-product-model";
import {CategoryService} from "../category.service";
import {Product} from "@find-a-buddy/data";
import {map} from "rxjs";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  public user:any  = [];
  public category: any = [];
  public products: any = [];
  public categories = new FormControl('');
  public categoryList: string[] = [];
  public selectedCategories: Category[] = [];


  constructor(private _userService: UserService, private _productService: ProductService,private _categoryService: CategoryService) { }
  ngOnInit(): void {
    this.user = this._userService.getUsers();
    this.products = this._productService.getAllProducts().subscribe(
        response => {
          this.products = response;
        }
    )
    this.categoryList = this._categoryService.GetCategories();
  }

  searchText: string = '';

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
    console.log(this.searchText);
  }

  onChange(value: Category[]) {
    this.selectedCategories = value;
    console.log(this.selectedCategories);
  }



}
