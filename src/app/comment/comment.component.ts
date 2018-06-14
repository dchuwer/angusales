import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientService } from '../client.service';
import { Comments } from '../../../Comments';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  customerId : number;
  Newcomment : String;
  dataSource : MatTableDataSource<Array<Comments>>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor (private clientService : ClientService,  public dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
          console.log(data);
          this.customerId = data[0].customer_id;
          console.log(this.customerId)
          this.dataSource = new MatTableDataSource(data);
          };
    
          displayedColumns = ['comment_id', 'text', 'date', 'customer_id'];
  
  addComment(newComment) {
    
  };

  ngOnInit() {
    // let client = this.clientService.findClient(this.customerId)
    // console.log(client)
    
    
  }

}
