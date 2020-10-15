import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/model/client';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { ClientService } from 'src/app/services/client.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order:Order;
  title:string;
  clients:Client[];
  selectedClient:Client;
  products:Product[];
  selectedProducts:Product[];

  constructor(
    private orderService:OrderService,
    private router:Router,
    private snackBar:MatSnackBar,
    private routing:ActivatedRoute,
    private clientService:ClientService,
    private productService:ProductService,
  ) { }

  ngOnInit(): void {
    this.order = new Order();
    this.selectedClient = null;
    this.selectedProducts = [];
    this.getById();
    this.getAllClients();
    this.getAllProducts();
    }

  getAllClients() {
    this.clientService.getAll().subscribe(result => {
      this.clients = result;
    });
  }

  getAllProducts() {
    this.productService.getAll().subscribe(result => {
      this.products = result;
    });
  }

  getById() {
    if( this.routing.snapshot.params.id  == "new"){
      this.title = "Novo Pedido";
    }else{
      this.title = "Atualizar Pedido";
      this.orderService.getById(this.routing.snapshot.params.id).subscribe(result => {
        this.order = result;
        this.selectedClient = result.client;
        this.selectedProducts = result.products;
      },
      error => {
        this.snackBar.open("Erro, verificar campos enviados.", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
      });
    }
    
  }
  
  createOrUpdate() {
    if ( this.routing.snapshot.params.id == "new" ){
      this.create();
    }else{
      this.update();
    }
  }

  create() {
    this.order.client = this.selectedClient;
    this.order.products = this.selectedProducts;
    this.orderService.create(this.order).subscribe(response => {
      this.snackBar.open("Salvo com sucesso!", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
      this.router.navigate(['/orders']);
    },
    error => {
      this.snackBar.open("Erro, verificar campos enviados.", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    })
  }

  update() {
    this.order.client = this.selectedClient;
    this.order.products = this.selectedProducts;
    this.orderService.update(this.order.id, this.order).subscribe(result => {
      this.snackBar.open("Atualizado com sucesso!", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
      this.router.navigate(['/orders']);
    },
    error => {
      this.snackBar.open("Erro, verificar campos enviados.", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    });
  }

  delete() {
    //this.productService.
  }

  cancel() {
    this.router.navigate(['/orders']);
  }

  compareClient(user1: Client, user2: Client) {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

  compareProducts(user1: Product, user2: Product) {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }
}
