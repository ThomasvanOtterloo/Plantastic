import { Injectable } from '@angular/core';
import {Category, Product} from "./component-product-model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product [] = [
    {
      id: 1,
      name: 'product 1',
      description: 'product 1 description',
      price: 100,
      quantity: 10,
      image: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_bird-of-paradise_large_upcycled_stonewash.jpg?v=1660319820&width=400',
      category: [Category.beginner],
      dateCreated: new Date()
    },
    {
      id: 2,
      name: 'product 2',
      description: 'product 2 description',
      price: 200,
      quantity: 20,
      image: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_bird-of-paradise_large_upcycled_stonewash.jpg?v=1660319820&width=400',
      category: [Category.aitPurifying, Category.petFriendly],
      dateCreated: new Date()
    },
    {
      id: 3,
      name: 'product 3',
      description: 'product 3 description',
      price: 300,
      quantity: 30,
      image: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_bird-of-paradise_large_upcycled_stonewash.jpg?v=1660319820&width=400',
      category: [Category.petFriendly, Category.aitPurifying],
      dateCreated: new Date()
    },
  ];


  constructor() { }



  public getProducts() {
    return this.products;
  }

  public getProductById(id: string) {
    var x = this.products.filter((Product) => Product.id === +id)[0];
    console.log(x);
    return x;
  }

  public deleteProductById(id: any) {
    let index = this.products.findIndex((Product) => Product.id === +id);
    console.log(index + "deleted index");
    this.products.splice(index, 1);
  }

  public create(product: Product) {
    return new Promise((resolve) => {
      if (product.image === '') {
        product.image = 'https://static.vecteezy.com/system/resources/previews/002/425/076/non_2x/plant-leaves-in-a-pot-beautiful-green-houseplant-isolated-simple-trendy-flat-style-for-interior-garden-decoration-design-free-vector.jpg';
      }
      this.products.push(product);
      resolve(true);
    });
  }

  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  price: number | undefined;
  image: string | undefined;
  category: Category | undefined;
  dateCreated: Date | undefined;


  save(param: Product ) {
    return new Promise((resolve) => {
      this.products.push(param);
      resolve(true);
    });
  };
}
