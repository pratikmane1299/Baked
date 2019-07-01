import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/must-match.validator';
import { PasswordService } from 'src/app/services/password service/password.service';
import { BootstrapAlertService, ToastMessageModel } from 'ngx-bootstrap-alert-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  messageList: ToastMessageModel[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private alert:BootstrapAlertService, 
    private passwordService: PasswordService) { }

  ngOnInit() {

    this.alert.getAlertEvent().subscribe(r => {
      this.messageList.push(r);
    });

    this.changePasswordForm = this.formBuilder.group({
      password: ['',Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get formControls() { return this.changePasswordForm.controls; }

  changePassword(){

    let userData = {
      "email": JSON.parse(localStorage.getItem('loggedInUser')).email,
      "new_password": this.changePasswordForm.value.password
    };
    this.passwordService.changePassword(userData)
      .subscribe(
        res => {
          /* if (res["success"]) {
            this.alert.showSucccess(res["message"]);
            console.log(res['message']);
          }
          else this.alert.showError(res["message"]); */

          this.alert.showSucccess(res["message"]);
        },
        error => {
          this.alert.showError(error["message"]);
        }
      );
    /* this.formControls.password.setValue('');
    this.formControls.confirmPassword.setValue(''); */
    this.changePasswordForm.controls.password.reset();
    this.changePasswordForm.controls.confirmPassword.reset();
  }
}
