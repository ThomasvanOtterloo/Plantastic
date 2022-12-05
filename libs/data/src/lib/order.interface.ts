import {Product, UserIdentity} from "@find-a-buddy/data";

export interface Order {
    productId: string;
    quantity: number;
    // product: Product;
}