import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  removeUser(userId: string) {
    return this.httpClient.delete('http://email-sender-production.up.railway.app/api/users/', 
      {params:{userId:userId}});
  }
 
  constructor(private httpClient: HttpClient) { }

  registerUser(signin: FormGroup) {
     return this.httpClient.post('http://email-sender-production.up.railway.app/api/users/', signin.value);
  }

  changeUserStatus(idUser: any, nextOrderDate: any, userStatus: boolean){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Access-Control-Allow-Origin',' *')
    this.httpClient.put('http://email-sender-production.up.railway.app/api/users/',
      headers,{params:{'_id':idUser,'nextOrderDate':nextOrderDate,'status':userStatus}}).subscribe(
      res=>{
        return res;
    },
    err =>{
      console.log(err)
    });
  }

}
