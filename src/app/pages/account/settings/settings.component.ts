import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app-pages-account-settings',
    templateUrl: './settings.component.html',
    styleUrls: [ './settings.component.css' ],
})
export class SettingsComponent {
    userObj = null;
    widthOfWindow;
    private displayNewPassword:boolean = false;

    resetObject = {
      "currentPassword":"",
      "password":"",
      "passwordConfirm":""
    };

    resetObjToSave = {
      "password":"",
      "passwordConfirm":"",
    }

    private passwordConfirmClass;
    private newPasswordClass;
    private oldPasswordClass;
    private passwordIsValid:boolean = false;
    private passwordConfirmIsValid:boolean = false;

    constructor(private auth:AuthService,private toaster:ToastrService,private router:Router) {
      this.widthOfWindow = window.screen.width;
      this.userObj = this.auth.doGetUserObj(this.auth.theUser.email);
    }

    onResize(event) {
    this.widthOfWindow = event.target.innerWidth;
  }

    onSubmit() {
      if (this.resetObject.currentPassword == this.userObj.password) {
        //password is valid
        this.displayNewPassword = true;
      } else {
        this.toaster.warning('Unable to verify identity - please check the password before trying again', 'Error!', {
          progressBar: true
        });
      }
    }

    onSubmitNewPassword() {
      if (this.passwordIsValid == true && this.passwordConfirmIsValid == true) {
        //valid
        this.resetObjToSave.password = this.resetObject.password;
        this.resetObjToSave.passwordConfirm = this.resetObject.password;

        if (this.resetObject.password == this.userObj.password) {
          this.toaster.warning('Your new password must differ from your current one - please try again', 'Error!', {
             progressBar: true
          });
          return;
        }

        var result = this.auth.doUpdateAccount(this.userObj.email, this.resetObjToSave);

        if (result == true) {
          //password reset
          this.auth.doLogout();
          this.router.navigate(['/auth/login']); 

          this.toaster.success('Your password has been successfully changed', 'Success!', {
            progressBar: true
          });

          this.toaster.info('You have been logged out - please login to continue','Authentication Required', {
            closeButton: true,
            disableTimeOut: true
          });
          
        } else {
          this.toaster.warning('Unable to change password - please try again', 'Error!', {
           progressBar: true
         });
        }
      } else {
        this.toaster.warning('Unable to change password - please check password complexity before trying again', 'Error!', {
           progressBar: true
         });
      }
    }

    oldPasswordChange():void {
      //checking if the password is greater than 7 in length (min of 8) 
      if (!(this.resetObject.currentPassword.length > 7)) {
        this.oldPasswordClass = "is-invalid";
      } else {
        //checking if the password contains a number (min 1)
        if (/\d/.test(this.resetObject.currentPassword)) {
          //checking if the password contains any special characters (min 1)
          var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
          if (specialCharacters.test(this.resetObject.currentPassword)) {
            //checking if the password contains at least one lowercase and one uppercase letter
            var lowerCaseInputted = this.resetObject.currentPassword.toUpperCase() != this.resetObject.currentPassword;
            var upperCaseInputted = this.resetObject.currentPassword.toLowerCase() != this.resetObject.currentPassword;
            if (lowerCaseInputted == true && upperCaseInputted == true) {
              this.oldPasswordClass = "is-valid";
            } else {
              this.oldPasswordClass = "is-invalid";
            }
          } else {
            this.oldPasswordClass = "is-invalid";
          }
        } else {
          this.oldPasswordClass = "is-invalid";
        }
      }
    }

    passwordChange():void {
      this.passwordIsValid = false;
      var passwordValid = false;
      //checking if the password is greater than 7 in length (min of 8) 
      if (!(this.resetObject.password.length > 7)) {
        this.newPasswordClass = "is-invalid";
        passwordValid = false;
      } else {
        //checking if the password contains a number (min 1)
        if (/\d/.test(this.resetObject.password)) {
          //checking if the password contains any special characters (min 1)
          var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
          if (specialCharacters.test(this.resetObject.password)) {
            //checking if the password contains at least one lowercase and one uppercase letter
            var lowerCaseInputted = this.resetObject.password.toUpperCase() != this.resetObject.password;
            var upperCaseInputted = this.resetObject.password.toLowerCase() != this.resetObject.password;
            if (lowerCaseInputted == true && upperCaseInputted == true) {
              this.newPasswordClass = "is-valid";
              this.passwordIsValid = true;
              passwordValid = true;
            } else {
              this.newPasswordClass = "is-invalid";
              passwordValid = false;
            }
          } else {
            this.newPasswordClass = "is-invalid";
            passwordValid = false;
          }
        } else {
          this.newPasswordClass = "is-invalid";
          passwordValid = false;
        }
      }

      if (this.resetObject.password == "") {
        this.newPasswordClass = "is-invalid";
      } else {
        if (passwordValid == false) {
          this.passwordConfirmClass = "is-invalid";
        } else {
          if (this.resetObject.password != this.resetObject.passwordConfirm) {
            this.passwordConfirmClass = "is-invalid";
          } else {
            this.passwordConfirmClass = "is-valid";
            this.passwordConfirmIsValid = true;
            this.passwordIsValid = true;
          }
        }
      }
    }

    passwordConfirmChange():void {
      this.passwordConfirmIsValid = false;
      //checking if the password confirm is greater than 7 in length (min of 8) 
      if (!(this.resetObject.passwordConfirm.length > 7)) {
        this.passwordConfirmClass = "is-invalid";
      } else {
        //checking if the password contains a number (min 1)
        if (/\d/.test(this.resetObject.passwordConfirm)) {
          //checking if the password contains any special characters (min 1)
          var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
          if (specialCharacters.test(this.resetObject.passwordConfirm)) {
            //checking if the password contains at least one lowercase and one uppercase letter
            var lowerCaseInputted = this.resetObject.passwordConfirm.toUpperCase() != this.resetObject.passwordConfirm;
            var upperCaseInputted = this.resetObject.passwordConfirm.toLowerCase() != this.resetObject.passwordConfirm;
            if (lowerCaseInputted == true && upperCaseInputted == true) {
              //checking if the 2 passwords match
              if (this.resetObject.password != this.resetObject.passwordConfirm) {
                this.passwordConfirmClass = "is-invalid";
              } else {
                this.passwordConfirmClass = "is-valid";
                this.passwordConfirmIsValid = true;
              }
            } else {
              this.passwordConfirmClass = "is-invalid";
            }
          } else {
            this.passwordConfirmClass = "is-invalid";
          }
        } else {
          this.passwordConfirmClass = "is-invalid";
        }
      }
    }

    questionPasswordClicked() {
      this.toaster.info('At least 8 characters, mixture of upper and lower case letters, at least 1 number and 1 special character', '⚠ Password Requirements', {
        closeButton: true,
        disableTimeOut: true
      });
    }
}