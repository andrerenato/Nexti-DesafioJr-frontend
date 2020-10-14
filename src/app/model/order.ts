import { Client } from './client';
import { Product } from './product';

export class Order {

    id:number;
    client:Client;
    totalAmount:number;
    purchaseDate:Date;
    products:Product[];
    
}