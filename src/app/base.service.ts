import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable()
  
export class BaseService<T> {
  public generalUpdated : Observable<Array<T>>;
  public generalSubject: Subject<Array<T>>;
  public route: string;
  public generalArray: Array<any>;  

  constructor(private http : HttpClient) {
    this.generalSubject = new Subject<Array<T>>();
    this.generalUpdated = this.generalSubject.asObservable();
    
    this.getAll();
   }

  getAll() : void {
      
      this.http.get<Array<T>>(this.route).subscribe((data)=>{
        console.log(data);
        this.generalArray = data;
        this.generalSubject.next(data);
      });
  }

  addItem(newItem: T) {
    this.http.post<T>(this.route,newItem).subscribe((data)=>{
    this.generalArray.push(data)
    this.generalSubject.next(this.generalArray);
  });

}

  deleteItem(itemId){
   
      this.http.delete<any[]>(this.route+itemId).subscribe((data)=>{
        let ind = this.finInd(itemId);
       
        this.generalArray.splice(ind,1)
        this.generalSubject.next(this.generalArray)});
    }

  updateItem(item){
    
    this.http.put<any[]>(this.route,item).subscribe((data)=>{ 
        let ind = this.finInd(item);        
        this.generalArray[ind] = item;
        this.generalSubject.next(this.generalArray)
      });
  }

  getItem(itemId) : void {
          this.http.get<any[]>(this.route+itemId).subscribe((data)=>{
            this.generalArray = data;
            this.generalSubject.next(this.generalArray);
          });
        }

  finInd(item) {
    
    if (this.route.includes("apicompany")) {
      var ind = this.generalArray.findIndex( x =>  (x.company_id == item.company_id) || (x.company_id == item) )
    }
    else {
      var ind = this.generalArray.findIndex( x =>  (x.customer_id == item.customer_id) || (x.customer_id == item) )
      
    }

    return ind

  }


}
