
export class Review {
  productId: number | undefined;
  author: string | undefined;
  description: string | undefined;
  dateCreated: any | undefined;
  rating: number ;



  constructor(productId: number, author: string, description: string, dateCreated: any, rating: number) {
    this.productId = productId;
    this.author = author;
    this.description = description;
    this.dateCreated = dateCreated;
    this.rating = rating;
  }
}
