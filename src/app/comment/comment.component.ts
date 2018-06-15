import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientService } from '../client.service';
import { Comments } from '../../../Comments';
import { Client } from 'Client';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments : {};
  customerId : number;
  client = new Client();
  Newcomment : String;
  dataSource : MatTableDataSource<Array<Comments>>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor (private clientService : ClientService,  public dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
          this.customerId = data[0].customer_id;
          this.dataSource = new MatTableDataSource(data)
          
  };
    
  displayedColumns = ['comment_id', 'text', 'date'];
  
  addComment(textComment){
    let newComment = {customer_id : this.customerId, text: textComment}
    this.clientService.addNewComment(newComment)
    this.clientService.commentUpdated.subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
    })
    
    
  };

  delete(){
    this.clientService.deleteClient(this.client.customer_id)
    this.dialogRef.close();
  }

  ngOnInit() {
    this.client = this.clientService.findClient(this.customerId)
    console.log(this.client.firstname)
    
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
