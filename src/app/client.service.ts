import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from 'client';

@Injectable()
export class ClientService extends BaseService<Client> { 
  route: string 
  
  constructor (http:HttpClient) {
     super(http)
     this.route = "apiclient/client";
  }

}


