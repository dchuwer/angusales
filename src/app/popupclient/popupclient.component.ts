import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Client } from 'Client';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-popupclient',
  templateUrl: './popupclient.component.html',
  styleUrls: ['./popupclient.component.css']
})
export class PopupclientComponent implements OnInit {
    newClient = new Client();
    companies = []
  constructor(private companyService : CompanyService, public dialogRef: MatDialogRef<PopupclientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
          this.newClient = data;
          this.companyService.companyUpdated.subscribe((companies)=>{
            this.companies = companies;          
          });
          
     
     }

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
    
  }

}






  
