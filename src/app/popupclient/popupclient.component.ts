import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Client } from 'Client';
import { CompanyService } from '../company.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-popupclient',
  templateUrl: './popupclient.component.html',
  styleUrls: ['./popupclient.component.css']
})
export class PopupclientComponent implements OnInit {
    showButton : boolean = true;
    newClient = new Client();
    companies = []
  constructor(private companyService : CompanyService,private clientService : ClientService, public dialogRef: MatDialogRef<PopupclientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
          this.newClient = data;
          
          this.companyService.companyUpdated.subscribe((companies)=>{
            this.companies = companies; 
        });
    }

    addNewClient() {
      this.newClient.company =  this.companies.find( x => x.name == this.newClient.company )
      if(this.showButton){
        
        console.log(this.newClient)

        this.clientService.addClient(this.newClient);
      }
      else
        this.clientService.updateClient(this.newClient);
      this.dialogRef.close();
    }
    
    onNoClick(): void {
      
      this.dialogRef.close();
    }

  ngOnInit() {
    this.companies = this.companyService.companies;
    if (this.newClient.customer_id > 0)
      this.showButton = false;
    // if (this.showButton) 
    //    this.newClient = new Client();
    
  }

}






  
