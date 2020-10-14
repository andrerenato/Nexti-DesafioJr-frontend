import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order:Order;
  title:string;

  constructor(
    private orderService:OrderService,
    private router:Router,
    private snackBar:MatSnackBar,
    private routing:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.order = new Order();
    this.getById();
    }

  getById() {
    if( this.routing.snapshot.params.id  == "new"){
      this.title = "Novo Pedido";
    }else{
      this.title = "Atualizar Pedido";
      this.orderService.getById(this.routing.snapshot.params.id).subscribe(result => {
        this.order = result;
      },
      error => {
        this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
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
    this.orderService.create(this.order).subscribe(response => {
      this.snackBar.open("Salvo com sucesso!", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
      this.router.navigate(['/orders']);
    },
    error => {
      this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    })
  }

  update() {
    this.orderService.update(this.order.id, this.order).subscribe(result => {
      this.snackBar.open("Atualizado com sucesso!", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
      this.router.navigate(['/orders']);
    },
    error => {
      this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    });
  }

  delete() {
    //this.productService.
  }

  cancel() {
    this.router.navigate(['/orders']);
  }
}
