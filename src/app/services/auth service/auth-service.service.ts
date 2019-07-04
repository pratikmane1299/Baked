import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseURL="https://sneakiest-sky.000webhostapp.com/api/";
  constructor(private http:HttpClient) { }

  registerUser(user){
    const data = new FormData();
    data.append("email",user.value.email);
    data.append("firstname",user.value.firstName);
    data.append("lastname",user.value.lastName);
    data.append("password",user.value.password);
    return this.http.post(this.baseURL+"create-user",data);
  }

  login(user){
    const data = new FormData();
    //data.append("email",user.value.email);
    //data.append("password",user.value.password);
    return this.http.post(this.baseURL+"login",JSON.stringify(user));
  }
}
