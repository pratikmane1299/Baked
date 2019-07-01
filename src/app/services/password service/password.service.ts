import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  forgotPasswordURL = "api/forgot-password";
  changePasswordURL = "api/change-password";
  constructor(private http: HttpClient) { }

  forgotPassword(userEmail) {
    return this.http.post(this.forgotPasswordURL,userEmail);
  }

  changePassword(newPassword){
    return this.http.put(this.changePasswordURL,newPassword);
  }
}
