export enum Category {
  beginner = "Beginner plant",
  aitPurifying = "air purifying",
  petFriendly = "pet friendly",

}



export class Product {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  price: number | undefined;
  image: string | undefined;
  category: Category | undefined;
  dateCreated: Date | undefined;

  constructor(id: number, name: string, description: string, price: number, image: string, category: Category, dateCreated: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.category = category;
    this.dateCreated = dateCreated;
  }
}




