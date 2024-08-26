import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrderByUserId(userId: string): Observable<any> {
    let params = new URLSearchParams();
    params.append("userId", userId)
    return this.httpClient.get('http://email-sender-production.up.railway.app/api/orders',{params:{'userId':userId}});
  }

  updateOrderByUser(dataSource: any, orderId: any){
    this.httpClient.put('http://email-sender-production.up.railway.app/api/orders/',
      {params:{'dataSource':dataSource,'orderId':orderId}}).subscribe(
      res=>{
    },
    err =>{
      console.log(err)
    });
  }
  }