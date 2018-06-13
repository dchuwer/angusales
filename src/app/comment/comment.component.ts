import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments : Array<any>;
  dataSource = new MatTableDataSource(this.comments);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor (private clientService : ClientService) {
        this.clientService.commentUpdated.subscribe((data)=>{
            this.comments = data;
            this.dataSource = new MatTableDataSource(this.comments);
            this.dataSource.paginator = this.paginator;
        });
    }

  
  ngOnInit() {
  }

}
