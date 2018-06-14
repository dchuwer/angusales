import { Component, OnInit } from '@angular/core';
import { PopupclientComponent } from '../popupclient/popupclient.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(private clientService: ClientService, public dialog: MatDialog) { }

  addClient(){
    let dialogRef = this.dialog.open(PopupclientComponent, {
      width: '600px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.clientService.addClient(result);
    });
  }

  ngOnInit() {
  }

}
