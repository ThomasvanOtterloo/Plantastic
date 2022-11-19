import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
    this.categoryList = this._categories.GetCategories();
  }

  @Output('getSelectedValues') EventEmitter = new EventEmitter<Category[]>();

  sendData(categories: Category[]) {
    this.EventEmitter.emit(categories);
  }
  categories = new FormControl('');
  categoryList: string[] = [];
  selectedCategories: Category[] = [];

  onChange(value: Category[]) {
    this.selectedCategories = value;
    this.sendData(this.selectedCategories);
  }
}

