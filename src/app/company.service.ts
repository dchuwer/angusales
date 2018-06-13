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

    
  }

  
