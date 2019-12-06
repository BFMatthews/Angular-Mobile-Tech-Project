import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app-pages-auth-reset',
    templateUrl: './reset.component.html',
    styleUrls: [ './reset.component.css' ],
})
export class ResetComponent {

    resetObject = {
      "email":"",
      "answer":"",
      "question":"",
      "password":"",
      "passwordConfirm":""
    };

    resetObjToSave = {
      "password":"",
      "passwordConfirm":"",
    }

    widthOfWindow;

    displayQuestion:boolean = false;
    displayNewPasswordFields:boolean = false;
    emailIsValid:boolean = false;
    passwordIsValid:boolean = false;
    passwordConfirmIsValid:boolean = false;
    emailClass = "";
    answerClass = "";
    passwordClass = "";
    passwordConfirmClass = "";
    userObj = null;

    constructor(private auth:AuthService,private toaster:ToastrService,private router:Router) {
      this.widthOfWindow = window.screen.width;
    }

    onResize(event) {
    this.widthOfWindow = event.target.innerWidth;
  }

    onSubmit() {
      if (this.emailIsValid == true) {
        this.userObj = this.auth.doGetUserObj(this.resetObject.email);
        
        if (this.userObj == null) {
          this.toaster.warning('Unable to identify - please check the email address before trying again', 'Error!', {
            progressBar: true
          });
        } else {
          //ask security question
          this.displayQuestion = true;
          this.resetObject.question = this.userObj.securityQuestion;
        }
      } else {
        this.toaster.warning('Invalid email address - please amend before trying again', 'Error!', {
          progressBar: true
        });
      }
    }

    onSubmitQuestion() {
      if (this.resetObject.answer == "" || this.resetObject.answer == undefined || this.resetObject.answer == null) {
        this.toaster.warning('Incorrect answer - please try again', 'Error!', {
          progressBar: true
        });
      } else {
        if (this.resetObject.answer == this.userObj.securityAnswer) {
          //do something
          this.answerClass = "is-valid";
          this.displayNewPasswordFields = true;
        } else {
          this.toaster.warning('Incorrect answer - please try again', 'Error!', {
            progressBar: true
          });
        }
      }
    }

    passwordChange():void {
      this.passwordIsValid = false;
      var passwordValid = false;
      //checking if the password is greater than 7 in length (min of 8) 
      if (!(this.resetObject.password.length > 7)) {
        this.passwordClass = "is-invalid";
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
              this.passwordClass = "is-valid";
              this.passwordIsValid = true;
              passwordValid = true;
            } else {
              this.passwordClass = "is-invalid";
              passwordValid = false;
            }
          } else {
            this.passwordClass = "is-invalid";
            passwordValid = false;
          }
        } else {
          this.passwordClass = "is-invalid";
          passwordValid = false;
        }
      }

      if (this.resetObject.password == "") {
        this.passwordClass = "is-invalid";
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

    onSubmitNewPassword() {
      if (this.passwordIsValid == true && this.passwordConfirmIsValid == true) {
        //valid
        this.resetObjToSave.password = this.resetObject.password;
        this.resetObjToSave.passwordConfirm = this.resetObject.password;
        var result = this.auth.doUpdateAccount(this.resetObject.email, this.resetObjToSave);

        if (result == true) {
          //password reset
          this.toaster.success('Your password has been successfully changed', 'Success!', {
            progressBar: true
          });
          this.router.navigate(['/auth/login']); 
        } else {
          this.toaster.warning('Unable to reset password - please try again', 'Error!', {
           progressBar: true
         });
        }
      } else {
        this.toaster.warning('Unable to reset password - please check password complexity before trying again', 'Error!', {
           progressBar: true
         });
      }
    }

    questionPasswordClicked() {
      this.toaster.info('At least 8 characters, mixture of upper and lower case letters, at least 1 number and 1 special character', '⚠ Password Requirements', {
        closeButton: true,
        disableTimeOut: true
      });
    }

    emailChange():void {
      this.emailIsValid = false;
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var result = re.test(String(this.resetObject.email).toLowerCase());
      
      if (result == false) {
        this.emailClass = "is-invalid";
      } else if (result == true) {
        this.emailClass = "is-valid";
        this.emailIsValid = true;
      }
    }
}