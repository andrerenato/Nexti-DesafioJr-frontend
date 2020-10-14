import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product:Product;
  title:string;

  constructor(
    private productService:ProductService,
    private router:Router,
    private snackBar:MatSnackBar,
    private routing:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product = new Product();
    this.getById();
    }

  getById() {
    if( this.routing.snapshot.params.id  == "new"){
      this.title = "Novo Produto";
    }else{
      this.title = "Atualizar Produto";
      this.productService.getById(this.routing.snapshot.params.id).subscribe(result => {
        this.product = result;
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
    this.productService.create(this.product).subscribe(response => {
      this.snackBar.open("Salvo com sucesso!", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
      this.router.navigate(['/products']);
    },
    error => {
      this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    })
  }

  update() {
    this.productService.update(this.product.id, this.product).subscribe(result => {
      this.snackBar.open("Atualizado com sucesso!", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
      this.router.navigate(['/products']);
    },
    error => {
      this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    });
  }

  delete() {
    //this.productService.
  }

  cancel() {
    this.router.navigate(['/products']);
  }

}
