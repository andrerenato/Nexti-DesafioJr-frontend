import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  client:Client;
  title:string;

  constructor(
    private clientService:ClientService,
    private router:Router,
    private snackBar:MatSnackBar,
    private routing:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.client = new Client();
    this.getById();
  }

  getById() {
    if( this.routing.snapshot.params.id  == "new"){
      this.title = "Novo Cliente";
    }else{
      this.title = "Atualizar Cliente";
      this.clientService.getById(this.routing.snapshot.params.id).subscribe(result => {
        this.client = result;
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
    this.clientService.create(this.client).subscribe(response => {
      this.snackBar.open("Salvo com sucesso!", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
      this.router.navigate(['/clients']);
    },
    error => {
      this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    })
  }

  update() {
    this.clientService.update(this.client.id, this.client).subscribe(result => {
      this.snackBar.open("Atualizado com sucesso!", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
      this.router.navigate(['/clients']);
    },
    error => {
      this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    });
  }

  cancel() {
    this.router.navigate(['/clients']);
  }

}
