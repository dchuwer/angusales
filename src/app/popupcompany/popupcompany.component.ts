import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Company } from 'Company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-popupcompany',
  templateUrl: './popupcompany.component.html',
  styleUrls: ['./popupcompany.component.css']
})
export class PopupcompanyComponent implements OnInit {
  showButton : boolean = true;
  newCompany = new Company();
  companies = []
constructor(private companyService : CompanyService, public dialogRef: MatDialogRef<PopupcompanyComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
        this.newCompany = data;
        
        this.companyService.companyUpdated.subscribe((companies)=>{
          this.companies = companies; 
      });
  }

  addNewCompany() {
    
    if(this.showButton){
      
      

      this.companyService.addCompany(this.newCompany);
    }
    else
      this.companyService.updateCompany(this.newCompany);
    this.dialogRef.close();
  }
  
  onNoClick(): void {
    
    this.dialogRef.close();
  }

ngOnInit() {
  // this.companies = this.companyService.companies;
  // if (this.newClient.customer_id > 0)
  //   this.showButton = false;
  // // if (this.showButton) 
  //    this.newClient = new Client();
  
}

}
