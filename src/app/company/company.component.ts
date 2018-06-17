import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Company } from 'company';
import { CompanyService } from '../company.service';
import { PopupcompanyComponent } from '../popupcompany/popupcompany.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  
  companies : Array<Company>;
  newCompany : Object;
  dataSource = new MatTableDataSource(this.companies);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private companyService: CompanyService,public dialog: MatDialog) {
    this.companyService.companyUpdated.subscribe((data)=>{
      this.companies = data;
      this.dataSource = new MatTableDataSource(this.companies);
      this.dataSource.paginator = this.paginator;
      
  });
   }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

   displayedColumns = ['id', 'name', 'country','icons']

   deleteCompany(companyId){
    this.companyService.deleteCompany(companyId);
  }

  editCompany(companyId){
    let company = this.companyService.findCompany(companyId)
    
    let dialogRef = this.dialog.open(PopupcompanyComponent, {
      width: '600px',
      data: company
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.companyService.updateCompany(result);
    });
  }
  ngOnInit() {
    this.companyService.getCompanies();
  }

}
