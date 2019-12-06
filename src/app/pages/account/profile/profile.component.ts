import { Component } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app-pages-account-profile',
    templateUrl: './profile.component.html',
    styleUrls: [ './profile.component.css' ],
})
export class ProfileComponent {
    currentUserEmail = null;
    avatarUseName:boolean = true;
    avatarUseF:boolean = false;
    avatarUseT:boolean = false;
    avatarUseS:boolean = false;
    avatarUseG:boolean = false;
    widthOfWindow;

    theUserObj = {};
    ngModelObj = {
      
      "forename":"",
      "surname":"",
      "nickname":"",
      "dob":null,
      "sex":"",
      "avatarCategory":"n",
      "avatarID":"",
      "securityQuestion":"",
      "securityAnswer":"",
    };

    private name;

    constructor(private toaster:ToastrService,private auth:AuthService,private router:Router) {
      this.widthOfWindow = window.screen.width;
      this.currentUserEmail = this.auth.theUser.email;
      this.theUserObj = this.auth.doGetUserObj(this.currentUserEmail);

      this.ngModelObj.forename = this.theUserObj['forename'];
      this.ngModelObj.surname = this.theUserObj['surname'];
      this.ngModelObj.nickname = this.theUserObj['nickname'];
      this.ngModelObj.dob = this.theUserObj['dob'];
      this.ngModelObj.sex = this.theUserObj['sex'];
      this.ngModelObj.avatarCategory = this.theUserObj['avatarCategory'];
      this.ngModelObj.avatarID = this.theUserObj['avatarID'];
      this.ngModelObj.securityQuestion = this.theUserObj['securityQuestion'];
      this.ngModelObj.securityAnswer = this.theUserObj['securityAnswer'];

      if (this.theUserObj['avatarID'] == null || this.theUserObj['avatarID'] == "" || this.theUserObj['avatarCategory'] == "n") {} else {
        if (this.theUserObj['avatarCategory'] == null || this.theUserObj['avatarCategory'] == "") {} else {
          this.avatarUseName = false;
          switch(this.theUserObj['avatarCategory']) {
            case "f":
              this.avatarUseF = true;
              break;
            case "t":
              this.avatarUseT = true;
              break;
            case "g":
              this.avatarUseG = true;
              break;
            case "s":
              this.avatarUseS = true;
              break;
          }
        }
      }
    }

    onResize(event) {
    this.widthOfWindow = event.target.innerWidth;
  }


    questionEmailClicked(): void {
      this.toaster.info('You are not able to change your email address, as it must be unique to you.', 'Change Email Address', {
        closeButton: true,
        disableTimeOut: true
      });
    }

    onSubmit():void {
      //implement validation

      if (this.ngModelObj['avatarCategory'] == "n") {
        this.ngModelObj['avatarID'] = "";
      }

      var result = this.auth.doUpdateAccount(this.currentUserEmail, this.ngModelObj);
      if (result == true) {
        this.router.navigate(['/general/books']);
        this.toaster.success('Your account has been successfully updated', 'Success!', {
          progressBar: true
        });
      } else {
        this.toaster.warning('Unable to update account - please try again', 'Error!', {
           progressBar: true
         });
      }
    }
}