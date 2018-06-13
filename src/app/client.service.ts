import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClientService {
  public clientUpdated : Observable<any>;
  public clientSubject: Subject<any>;
  public commentUpdated : Observable<any>;
  public commentSubject: Subject<any>;
  clients = [];
  comments =[];
  constructor(private http : HttpClient) {
    this.clientSubject = new Subject<number>();
    this.clientUpdated = this.clientSubject.asObservable();
    this.getClients();
    this.commentSubject = new Subject<number>();
    this.commentUpdated = this.commentSubject.asObservable();
    this.getComments();
  }

   getClients() : void {
      this.http.get<any[]>('/apiclient/client').subscribe((data)=>{
        this.clients = data;
        this.clientSubject.next(this.clients);
      });
    }

    addClient(newClient) {
      console.log("service client -> API")
      
      this.http.post<any[]>('/apiclient/addclient',newClient).subscribe((data)=>{
            this.getClients();
      });
    }

    getComments(){
      this.http.get<any[]>('/apiclient/comment').subscribe((data)=>{
        this.comments = data;
        this.commentSubject.next(this.comments);
      });

    }



  

}
