import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  baseURL="https://sneakiest-sky.000webhostapp.com/api/";

  constructor(private http: HttpClient) { }

  forgotPassword(userEmail) {
    const data = new FormData();
    data.append("email",userEmail);
    return this.http.post(this.baseURL+"forgot-password",data);
  }

  changePassword(newPassword){
    const data = new FormData();
    data.append("email",newPassword.email);
    data.append("new_password",newPassword.new_password);
    return this.http.post(this.baseURL+"change-password",data);
  }
}
