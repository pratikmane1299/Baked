import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth service/auth-service.service';
import { BootstrapAlertService, ToastMessageModel } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = "Login";
  showCart: boolean = false;

  isPageValid:Boolean = true
  loginSuccess;
  user;
  messageList: ToastMessageModel[]=[];
  returnUrl: string;

  constructor(
    private router:Router,
    private auth:AuthService,
    private alert:BootstrapAlertService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.alert.getAlertEvent().subscribe(r => {
      this.messageList.push(r);
    });

    this.returnUrl = this.route.snapshot.queryParams['returnurl'] || '/';

  } 

  login(f){
    this.user = {
      "email":f.value.email,
      "password":f.value.password
    };
    this.auth.login(this.user)
      .subscribe(
        res => {
          if (res['success']) {
            this.user = res['custdata'];
            this.alert.showSucccess(res['message']);
            setTimeout(() => {
              localStorage.setItem("loggedInUser",JSON.stringify(this.user));
              this.router.navigateByUrl(this.returnUrl);
            },2000);
          }
          else this.alert.showError(res['message']); 
        },
        error => {
          this.alert.showError(error['message']);
        }
      );
  }

}
