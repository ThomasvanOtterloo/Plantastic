import {Product, UserIdentity} from "@find-a-buddy/data";

export interface Order {
    id: string;
    userId: string;
    productId: Product;
    quantity: number;
    total: number;
    deliveryDate: Date;
}