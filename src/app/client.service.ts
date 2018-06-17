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
    console.log("constructor client service")
    this.clientSubject = new Subject<any>();
    this.clientUpdated = this.clientSubject.asObservable();
    this.getClients();
    this.commentSubject = new Subject<any>();
    this.commentUpdated = this.commentSubject.asObservable();
    
  }

   getClients() : void {
      this.http.get<any[]>('/apiclient/client').subscribe((data)=>{
        this.clients = data;
        this.clientSubject.next(this.clients);
      });
    }

    addClient(newClient) {
     
      this.http.post<any[]>('/apiclient/addclient',newClient).subscribe((data)=>{
            this.clients.push(data)
            this.clientSubject.next(this.clients);
      });
    }

    updateClient(client){
      this.http.put<any[]>('/apiclient/updateclient',client).subscribe((data)=>{
          let ind = this.clients.findIndex( x => x.customer_id == client.customer_id)
          this.clients[ind] = client;
          this.clientSubject.next(this.clients)});
    }

    deleteClient(clientId){
      console.log(clientId)
      this.http.delete<any[]>('/apiclient/deleteclient/'+clientId).subscribe((data)=>{
        let ind = this.clients.findIndex( x => x.customer_id == clientId)
        console.log(ind)
        this.clients.splice(ind,1)
        this.clientSubject.next(this.clients)});
    }


    getComments(client){
      return this.http.get<any[]>('/apiclient/comment/'+client).subscribe((data)=>{
        this.comments = data;
        console.log(data)
        this.commentSubject.next(this.comments);
        
      });

    }

    addNewComment(newComment){
        this.http.post<any[]>('/apiclient/addcomment',newComment).subscribe((data)=>{
        this.comments.push(data)
        this.commentSubject.next(this.comments)});
    }

    
    findClient(id) {
      
        return  this.clients.find( x => x.customer_id == id )
    }
    



  

}
