import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  confirm:boolean = false;
  clientList:Client[];
  displayedColumns = ['id', 'name', 'cpf', 'birthdate', 'actions']; 

  constructor(
    private router : Router,
    private clientService:ClientService,
    private snackBar:MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.clientList = [];
    this.getAll();
  }

  create() {
    this.router.navigate(['/clients/new']);
  }

  getAll() {
    this.clientService.getAll().subscribe(response => {
      this.clientList = response;
    },
    error => {
      this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    });
  }

  delete(id:number) {
    this.clientService.delete(id).subscribe(result => {
      this.snackBar.open("Cliente removido com sucesso!", 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    },
    error => {
      this.snackBar.open(error.message, 'x', { duration:3000, horizontalPosition:'right', verticalPosition:'top' });
    });
    this.confirm = false;
    this.getAll();
  }

}
