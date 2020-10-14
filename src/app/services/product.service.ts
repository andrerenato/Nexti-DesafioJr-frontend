import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl:string = 'http://localhost:8080';

  constructor(
    private http:HttpClient,
  ) { }

    create(product:Product): Observable<Product>{
      return this.http.post<Product>(this.baseUrl+'/products', product);
    }

    getAll(): Observable<Product[]>{
      return this.http.get<Product[]>(this.baseUrl+'/products');
    }

    getById(id:number): Observable<Product>{
      return this.http.get<Product>(this.baseUrl+`/products/${id}`);
    }

    update(id:number, product:Product): Observable<Product>{
      return this.http.put<Product>(this.baseUrl+`/products/${id}`, product);
    }

    delete(id:number): Observable<object>{
      return this.http.delete<object>(this.baseUrl+`/products/${id}`);
    }
}
