import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientService } from '../client.service';
import { Comments } from '../../../Comments';
import { Client } from 'Client';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments : Array<Comments>
  customerId : number;
  client = new Client();
  Newcomment : String;
  dataSource = new MatTableDataSource(this.comments);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor (private commentService : CommentService, private clientService : ClientService, public dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     
      this.customerId = data[0].customer_id;
      this.comments = data
      this.dataSource = new MatTableDataSource(this.comments);
  };
    
  displayedColumns = ['comment_id', 'text', 'date'];
  
  addComment(newText){
    let newComment = {customer_id : this.customerId, text: newText, comment_id : 0, date: new Date()}
    this.commentService.route = 'apiclient/addcomment'
    this.commentService.addItem(newComment)

  };

  delete(){
    this.commentService.route = 'apiclient/deleteclient/'
    this.commentService.deleteItem(this.client.customer_id)
    this.dialogRef.close();
  }

  ngOnInit() {
    this.client = this.clientService.generalArray.find( x => x.customer_id == this.customerId)
      this.commentService.generalUpdated.subscribe((data)=>{
      this.comments = data;
      this.customerId = data[0].customer_id;
      this.dataSource = new MatTableDataSource(data)
    })
    
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
