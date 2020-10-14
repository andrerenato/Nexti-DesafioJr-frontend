import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  confirm:boolean = false;
  orderList:Order[];
  displayedColumns = ['id', 'client', 'totalAmount', 'purchaseDate', 'actions'];

  constructor(
    private router : Router,
    private orderService:OrderService,
    private snackBar:MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.orderList = [];
    this.getAll();
  }

  create() {
    this.router.navigate(['/orders/new']);
  }

  getAll() {
    this.orderService.getAll().subscribe(response => {
      this.orderList = response;
    },
    error => {
      this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    });
  }

  delete(id:number) {
    this.orderService.delete(id).subscribe(result => {
      this.snackBar.open("Pedido removido com sucesso!", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    },
    error => {
      this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    });
    this.confirm = false;
    this.getAll();
  }

}
