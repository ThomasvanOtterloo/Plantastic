import {Product, UserIdentity} from "@find-a-buddy/data";

export interface Order {
    id: string;
    user: UserIdentity;
    products: Product;
    quantity: number;
    total: number;
    deliveryDate: Date;
}