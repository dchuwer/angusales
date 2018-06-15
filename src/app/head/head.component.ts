import { Component, OnInit } from '@angular/core';
import { PopupclientComponent } from '../popupclient/popupclient.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  flagAddClient: Boolean = true;
  constructor(private clientService: ClientService, public dialog: MatDialog, public router: Router) { }
  
  addClient(){
    let dialogRef = this.dialog.open(PopupclientComponent, {
      width: '600px',
      data: {}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    //   this.clientService.addClient(result);
    // });
  }

  ngOnInit() {}
    

}
