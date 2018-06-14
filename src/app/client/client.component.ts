import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ClientService } from '../client.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  clients : Array<any>;
  dataSource = new MatTableDataSource(this.clients);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor (private clientService : ClientService, public dialog: MatDialog) {
        this.clientService.clientUpdated.subscribe((data)=>{
            this.clients = data;
            this.dataSource = new MatTableDataSource(this.clients);
            this.dataSource.paginator = this.paginator;
        });
    }
  

  displayedColumns = ['id', 'firstname', 'lastname', 'company', 'email', 'phone', 'comments','addcomment'];
  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showComments(client){
    let commentList = this.clientService.getComments(client)
    this.clientService.commentUpdated.subscribe((data)=>{
      console.log("shoecomment:" + data)
      let dialogRef = this.dialog.open(CommentComponent, {
        width: '600px',
        data: data
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.clientService.addClient(result);
      });
     // console.log(row)
    })
  }
 
    
  ngOnInit() {
    
   
  }
}
