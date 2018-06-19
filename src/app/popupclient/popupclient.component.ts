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
    selected: string;
    debugger
  
    companies = []
  constructor(private companyService : CompanyService,private clientService : ClientService, public dialogRef: MatDialogRef<PopupclientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      debugger
         this.companyService.getAll();
         this.companyService.generalUpdated.subscribe((companies)=>{
         this.companies = companies; 
       });
    }

    addNewClient() {
      
      
      this.data.company_id =  parseInt(this.data.company_id)
      
      if(this.showButton){
        
        this.clientService.route = "apiclient/addclient"
        this.clientService.addItem(this.data);
      }
      else{
        
        this.clientService.route = "apiclient/updateclient"
        this.clientService.updateItem(this.data);
      }
      
      this.dialogRef.close();
    }
    
    onNoClick(): void {
      
      this.dialogRef.close();
    }

  ngOnInit() {
   
    if (this.data.customer_id > 0){
      this.showButton = false;
      this.data.company_id = this.data.company_id.toString();
    }
    else
    this.data.company_id = "";
    
  
    
  }

}






  
