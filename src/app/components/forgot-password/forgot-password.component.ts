import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PasswordService } from '../../services/password service/password.service';
import { BootstrapAlertService, ToastMessageModel } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  messageList: ToastMessageModel[]=[];

  constructor(private PasswordService: PasswordService,
    private alert:BootstrapAlertService) { }

  ngOnInit() {
    this.alert.getAlertEvent().subscribe(r => {
      this.messageList.push(r);
    });
  }

  recievePassword(f) {
    let json={
      "email":f.value.email
    };

    this.PasswordService.forgotPassword(f.value.email)
    .subscribe(
      msg => {
        if (msg['success']) {
          this.alert.showSucccess(msg["message"]);
        } else {
          this.alert.showError(msg["message"]);
        }
      }
    );
  }
}
