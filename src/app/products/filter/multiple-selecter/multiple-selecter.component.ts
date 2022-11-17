import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Category} from "../../component-product-model";
import {CategoryService} from "../../category.service";

@Component({
  selector: 'app-multiple-selecter',
  templateUrl: './multiple-selecter.component.html',
  styleUrls: ['./multiple-selecter.component.css']
})
export class MultipleSelecterComponent implements OnInit {

  constructor(private _categories: CategoryService) {
  }

  ngOnInit(): void {
    this.toppingList = this._categories.GetCategories();
  }


  @Output()
  category: EventEmitter<[]> = new EventEmitter<[]>();

  toppings = new FormControl('');
  toppingList: string[] = [];









}

