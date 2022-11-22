import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  categories: string[] = ['Beginner plants', 'Air purifying', 'Pet friendly'];

  public GetCategories() {
    return this.categories;
  }







}
