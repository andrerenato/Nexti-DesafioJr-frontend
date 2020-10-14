import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  baseUrl:string = 'http://localhost:8080';

  constructor(
    private http:HttpClient,
  ) { }

    create(order:Order): Observable<Order>{
      return this.http.post<Order>(this.baseUrl+'/orders', order);
    }

    getAll(): Observable<Order[]>{
      return this.http.get<Order[]>(this.baseUrl+'/orders');
    }

    getById(id:number): Observable<Order>{
      return this.http.get<Order>(this.baseUrl+`/orders/${id}`);
    }

    update(id:number, order:Order): Observable<Order>{
      return this.http.put<Order>(this.baseUrl+`/orders/${id}`, order);
    }

    delete(id:number): Observable<object>{
      return this.http.delete<object>(this.baseUrl+`/orders/${id}`);
    }
}
