import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private httpClient: HttpClient) { }

  registerUser(signin: FormGroup) {
     return this.httpClient.post('http://localhost:8000/api/users/', signin.value);
  }

  changeUserStatus(idUser: any, nextOrderDate: any, userStatus: boolean){
    this.httpClient.put('http://localhost:8000/api/users/',
      {params:{'_id':idUser,'nextOrderDate':nextOrderDate,'status':userStatus}}).subscribe(
      res=>{
    },
    err =>{
      console.log(err)
    });
  }

}
