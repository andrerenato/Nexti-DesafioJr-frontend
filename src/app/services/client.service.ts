import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl:string = 'http://localhost:8080';

  constructor(
    private http:HttpClient,
  ) { }

  create(client:Client): Observable<Client>{
    return this.http.post<Client>(this.baseUrl+'/clients', client);
  }

  getAll(): Observable<Client[]>{
    return this.http.get<Client[]>(this.baseUrl+'/clients');
  }

  getById(id:number): Observable<Client>{
    return this.http.get<Client>(this.baseUrl+`/clients/${id}`);
  }

  update(id:number, client:Client): Observable<Client>{
    return this.http.put<Client>(this.baseUrl+`/clients/${id}`, client);
  }

  delete(id:number): Observable<object>{
    return this.http.delete<object>(this.baseUrl+`/clients/${id}`);
  }

}
