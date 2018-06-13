import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  clients : Array<any>;
  dataSource = new MatTableDataSource(this.clients);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor (private clientService : ClientService) {
        this.clientService.clientUpdated.subscribe((data)=>{
            this.clients = data;
            this.dataSource = new MatTableDataSource(this.clients);
            this.dataSource.paginator = this.paginator;
        });
    }
  

  displayedColumns = ['id', 'firstname', 'lastname', 'company', 'email', 'phone', 'comments'];
  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showComments(row){
    console.log(row)
  }
  ngOnInit() {
    
   
  }
}
