import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ClientService } from '../client.service';
import { CommentComponent } from '../comment/comment.component';
import { PopupclientComponent } from '../popupclient/popupclient.component';
import { CompanyService } from '../company.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  first : boolean 
  clients : Array<any>;
  newClient : Object;
  dataSource = new MatTableDataSource(this.clients);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor (private clientService : ClientService, private companyService: CompanyService,public dialog: MatDialog) {
        this.clientService.clientUpdated.subscribe((data)=>{
            this.clients = data;
            this.dataSource = new MatTableDataSource(this.clients);
            this.dataSource.paginator = this.paginator;
            this.first = true;
        });
    }
  

  displayedColumns = ['id', 'firstname', 'lastname', 'company', 'email', 'phone', 'comments','addcomment','deleteclient'];
  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  editCustomer(customerId){
    let client = this.clientService.findClient(customerId)
    let companySelected = this.companyService.findCompany(client.company_id)
    client.company = companySelected.name;
    let dialogRef = this.dialog.open(PopupclientComponent, {
      width: '600px',
      data: client
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.clientService.addClient(result);
    });
  }

  deleteCustomer(customerId){
    this.clientService.deleteClient(customerId);
  }

  

  showComments(client){
    this.clientService.getComments(client)
    let upsubscribe = this.clientService.commentUpdated.subscribe((data)=>{
      
      console.log(data)
      if (data.length == 0) 
         data[0] = {customer_id : client};
      console.log(data)
      if (this.first) {
          this.first = false;
          let dialogRef = this.dialog.open(CommentComponent, {
            width: '600px',
            data: data
          });
      
          dialogRef.afterClosed().subscribe(result => {
            upsubscribe.unsubscribe();
            this.first = true;
                     
          });
      }
     
    })

   
  }
 
  // addFilter(filter) {
  //   console.log(filter)
  //   let filterCompany =  this.companyService.companies.find( x => x.name == this.newClient.company )
  //   let companySelected = this.companyService.findCompany(filter)
  //   this.companyService.

  // }
    
  ngOnInit() {
    this.clientService.getClients();
   
  }
}
