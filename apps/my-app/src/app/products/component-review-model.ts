
export class Review {
  id: number | undefined;
  authorId: string | undefined;
  productId: number | undefined;

  description: string | undefined;
  dateCreated: any | undefined;
  rating: number ;


    constructor(id: number, productId: number, authorId: string, description: string, dateCreated: any, rating: number) {
      this.id = id;
      this.authorId = authorId;
      this.productId = productId;

      this.description = description;
      this.dateCreated = dateCreated;
      this.rating = rating;
    }
}
