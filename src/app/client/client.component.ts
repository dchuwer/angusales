import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ClientService } from '../client.service';
import { CommentComponent } from '../comment/comment.component';
import { PopupclientComponent } from '../popupclient/popupclient.component';
import { CommentService } from '../comment.service';
import { Comments } from 'Comments'

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  first : boolean 
  filterUp : boolean = false;
  clients : Array<any>;
  newClient : Object;
  dataSource = new MatTableDataSource(this.clients);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor (private clientService : ClientService, private commentService: CommentService,public dialog: MatDialog) {
        this.clientService.generalUpdated.subscribe((data)=>{
            this.clients = data;
            this.dataSource = new MatTableDataSource(this.clients);
            this.dataSource.paginator = this.paginator;
            this.first = true;
        });
    }
  

  displayedColumns = ['id', 'firstname', 'lastname', 'company', 'email', 'phone', 'icons'];
  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  editCustomer(customer){
        
    let dialogRef = this.dialog.open(PopupclientComponent, {
      width: '600px',
      data: customer
    });
  }

  deleteCustomer(customerId){
    this.clientService.route = "apiclient/deleteclient/"
    this.clientService.deleteItem(customerId);
  }

  addFilter(filter) {
    this.filterUp = true;
    this.clientService.route = 'apiclient/filtercompany/'
    this.clientService.getItem(filter);
  }

  
  showComments(clientId){
    
    this.commentService.route = 'apiclient/comment/'
    this.commentService.getItem(clientId)
    let upsubscribe = this.commentService.generalUpdated.subscribe((data)=>{
      debugger
      console.log(data)
      
      if (data.length == 0) {
        let newComment = new Comments()
        newComment.customer_id = clientId
        data.push(newComment)
      }
         
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
  ngOnInit() {
    this.filterUp= false;
    this.clientService.getAll();
   
  }
}

 