import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth service/auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BootstrapAlertService, ToastMessageModel } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user;
  response;
  messageList: ToastMessageModel[]=[];

  constructor(
    private auth:AuthService,
    private http: HttpClient,
    private alert:BootstrapAlertService,
    private route:Router) {
  }

  ngOnInit() {
    this.alert.getAlertEvent().subscribe(r => {
      this.messageList.push(r);
    })
  }

  register(f) {

    this.user = {
      "email":f.value.email,
      "firstname":f.value.firstName,
      "lastname":f.value.lastName,
      "password":f.value.password
    };

    this.auth.registerUser(this.user)
    .subscribe(
      res => {
        console.log(res["message"]);
        this.alert.showSucccess(res["message"]);
        setTimeout(() => {
          this.route.navigate(['/login']);
        },1000);
      },
      error => {
        this.alert.showError(error["message"]);
      }
    );
  }
}
