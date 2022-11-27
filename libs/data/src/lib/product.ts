import { Id } from "./id.type";
import { Review } from "./review.interface";
import { UserIdentity } from "./user.interface";
import {Category} from "./category";

export interface Product {
    id: Id;
    author: string;
    name: string;
    description: string;
    image: string;
    rating: number;
    quantity: number;
    price: number;
    reviews: Review[];
    category: Category[];
}


