import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private httpClient: HttpClient) { }

  registerUser(signin: FormGroup) {
    this.httpClient.post('http://localhost:8000/api/users/', signin.value).subscribe(
      res=>{
    },
    err =>{
      console.log(err)
    });
  }

}
