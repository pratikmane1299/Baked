import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  url = "api/create-user.php";
  loginUrl = "api/login";
  constructor(private http:HttpClient) { }

  registerUser(user){
    return this.http.post(this.url,user);
  }

  login(user){
    return this.http.post(this.loginUrl,user);
  }
}
