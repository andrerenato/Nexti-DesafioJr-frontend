import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {

  confirm:boolean = false;
  productList:Product[];
  displayedColumns = ['id', 'name', 'sku', 'value', 'quantity', 'actions']; 
  
  
  constructor(
    private router : Router,
    private productService:ProductService,
    private snackBar:MatSnackBar,
    ) { }
    
  ngOnInit(): void {
    this.productList = [];
    this.getAll();
  }

  create() {
    this.router.navigate(['/products/new']);
  }

  getAll() {
    this.productService.getAll().subscribe(response => {
      this.productList = response;
    },
    error => {
      this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    });
  }

  delete(id:number) {
    this.productService.delete(id).subscribe(result => {
      this.snackBar.open("Produto removido com sucesso!", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    },
    error => {
      this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    });
    this.confirm = false;
    this.getAll();
  }
}
