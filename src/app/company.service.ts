import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CompanyService {
  
  public companyUpdated : Observable<any>;
  public companySubject: Subject<any>;
  companies = [];
  constructor(private http : HttpClient) {
    this.companySubject = new Subject<number>();
    this.companyUpdated = this.companySubject.asObservable();
    this.getCompanies();
   }

   getCompanies() : void {
    this.http.get<any[]>('/apicompany/company').subscribe((data)=>{
      console.log(data);
      this.companies = data;
      this.companySubject.next(this.companies);
    });
    
    }

    findCompany(company_id) {
      return  this.companies.find( x => x.company_id == company_id )
    }

    addCompany(newCompany) {
      this.http.post<any[]>('/apicompany/addcompany',newCompany).subscribe((data)=>{
        this.companies.push(data)
        this.companySubject.next(this.companies);
     });

    }

    deleteCompany(companyId){
      
      this.http.delete<any[]>('/apicompany/deletecompany/'+companyId).subscribe((data)=>{
        let ind = this.companies.findIndex( x => x.company_id == companyId)
        console.log(ind)
        this.companies.splice(ind,1)
        this.companySubject.next(this.companies)});
    }
    
    updateCompany(company){
      this.http.put<any[]>('/apicompany/updatecompany',company).subscribe((data)=>{
          let ind = this.companies.findIndex( x => x.company_id == company.company_id)
          this.companies[ind] = company;
          this.companySubject.next(this.companies)});
    }

  }

  
