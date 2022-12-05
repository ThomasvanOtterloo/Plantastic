import { Id } from "./id.type";
import { Review } from "./review.interface";
import { UserIdentity } from "./user.interface";
import {Category} from "./category";

export interface Product {
    id: Id;
    author: string;
    authorId: Id;
    name: string;
    description: string;
    image: string;
    quantity: number;
    price: number;
    reviews: Review[];
    category: Category[];
}


