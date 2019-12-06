import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.class';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'my-app-pages-auth-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.css' ],
})
export class RegisterComponent {

    private user: User = new User();
    
    registerObject = {
      "forename":"",
      "surname":"",
      "nickname":"",
      "dob":null,
      "sex":"",
      "email":"",
      "emailConfirm":"",
      "password":"",
      "passwordConfirm":"",
      "avatarCategory":"n",
      "avatarID":"",
      "permission":"user",
      "securityQuestion":"",
      "securityAnswer":"",
      "locked":false,
      "loans":[]
    };

    widthOfWindow;

    forenameClass = "";
    surnameClass = "";
    nicknameClass = "";
    dobClass = "";
    sexClass = "";
    emailClass = "";
    emailConfirmClass = "";
    passwordClass = "";
    passwordConfirmClass = "";
    eyeClass = "far fa-eye";
    securityQuestionClass = "";
    securityAnswerClass = "";

    forenameIsValid:boolean = false;
    surnameIsValid:boolean = false;
    nicknameIsValid:boolean = false;
    dobIsValid:boolean = false;
    sexIsValid:boolean = false;
    emailIsValid:boolean = false;
    emailConfirmIsValid:boolean = false;
    passwordIsValid:boolean = false;
    passwordConfirmIsValid:boolean = false;
    securityQuestionValid:boolean = false;
    securityAnswerValid:boolean = false;

    displayPasswordHelp:boolean = false;
    displayErrorText:boolean = false;
    displayAnswerClear:boolean = false;

    forenameChange():void {
      this.forenameIsValid = false;
      if (this.registerObject.forename == "" || this.registerObject.forename == undefined) {
        this.forenameClass = "is-invalid";
      } else {
        this.forenameClass = "is-valid";
        this.forenameIsValid = true;
      }
    }

    onResize(event) {
    this.widthOfWindow = event.target.innerWidth;
  }

    displayAnswer(): void {
      this.displayAnswerClear = !this.displayAnswerClear;
      if (this.displayAnswerClear) {
        this.eyeClass = "far fa-eye-slash";
      } else {
        this.eyeClass = "far fa-eye";
      }
    }

    surnameChange():void {
      this.surnameIsValid = false;
      if (this.registerObject.surname == "" || this.registerObject.surname == undefined) {
        this.surnameClass = "is-invalid";
      } else {
        this.surnameClass = "is-valid";
        this.surnameIsValid = true;
      }
    }

    nicknameChange():void {
      this.nicknameIsValid = false;
      if (this.registerObject.nickname == "" || this.registerObject.nickname == undefined) {
        this.nicknameClass = "is-invalid";
      } else {
        this.nicknameClass = "is-valid";
        this.nicknameIsValid = true;
      }
    }

    dobChange():void {
      this.dobIsValid = false;
      if (this.registerObject.dob == "" || this.registerObject.dob == undefined) {
        this.dobClass = "is-invalid";
      } else {
        this.dobClass = "is-valid";
        this.dobIsValid = true;
      }
    }

    securityAnswerChange():void {
      this.securityAnswerValid = false;
      if (this.registerObject.securityAnswer == "" || this.registerObject.securityAnswer == undefined) {
        this.securityAnswerClass = "is-invalid";
      } else {
        this.securityAnswerClass = "is-valid";
        this.securityAnswerValid = true;
      }
    }

    securityQuestionChange():void {
      this.securityQuestionClass = "is-valid";
      this.securityQuestionValid = true;
    }

    sexChange():void {
      this.sexClass = "is-valid";
      this.sexIsValid = true;
    }

    emailChange():void {
      this.emailIsValid = false;
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var result = re.test(String(this.registerObject.email).toLowerCase());
      
      if (result == false) {
        this.emailClass = "is-invalid";
      } else if (result == true) {
        this.emailClass = "is-valid";
        this.emailIsValid = true;
      }

      if (this.registerObject.email == "") {
        this.emailConfirmClass = "is-invalid";
      } else {
        if (this.registerObject.email != this.registerObject.emailConfirm) {
          this.emailConfirmClass = "is-invalid";
        } else {
          this.emailConfirmClass = "is-valid";
          this.emailIsValid = true;
          this.emailConfirmIsValid = true;
        }
      }
    }

    emailConfirmChange():void {
      this.emailConfirmIsValid = false;
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var result = re.test(String(this.registerObject.emailConfirm).toLowerCase());

      if (result == true) {
        
        if (this.registerObject.email != this.registerObject.emailConfirm) {
          this.emailConfirmClass = "is-invalid";
        } else {
          this.emailConfirmClass = "is-valid";
          this.emailConfirmIsValid = true;
        }

      } else if (result == false) {
        this.emailConfirmClass = "is-invalid";
      }
    }

    passwordChange():void {
      this.passwordIsValid = false;
      var passwordValid = false;
      //checking if the password is greater than 7 in length (min of 8) 
      if (!(this.registerObject.password.length > 7)) {
        this.passwordClass = "is-invalid";
        passwordValid = false;
      } else {
        //checking if the password contains a number (min 1)
        if (/\d/.test(this.registerObject.password)) {
          //checking if the password contains any special characters (min 1)
          var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
          if (specialCharacters.test(this.registerObject.password)) {
            //checking if the password contains at least one lowercase and one uppercase letter
            var lowerCaseInputted = this.registerObject.password.toUpperCase() != this.registerObject.password;
            var upperCaseInputted = this.registerObject.password.toLowerCase() != this.registerObject.password;
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

      if (this.registerObject.password == "") {
        this.passwordClass = "is-invalid";
      } else {
        if (passwordValid == false) {
          this.passwordConfirmClass = "is-invalid";
        } else {
          if (this.registerObject.password != this.registerObject.passwordConfirm) {
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
      if (!(this.registerObject.passwordConfirm.length > 7)) {
        this.passwordConfirmClass = "is-invalid";
      } else {
        //checking if the password contains a number (min 1)
        if (/\d/.test(this.registerObject.passwordConfirm)) {
          //checking if the password contains any special characters (min 1)
          var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
          if (specialCharacters.test(this.registerObject.passwordConfirm)) {
            //checking if the password contains at least one lowercase and one uppercase letter
            var lowerCaseInputted = this.registerObject.passwordConfirm.toUpperCase() != this.registerObject.passwordConfirm;
            var upperCaseInputted = this.registerObject.passwordConfirm.toLowerCase() != this.registerObject.passwordConfirm;
            if (lowerCaseInputted == true && upperCaseInputted == true) {
              //checking if the 2 passwords match
              if (this.registerObject.password != this.registerObject.passwordConfirm) {
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

    questionPasswordClicked():void {
      this.toaster.info('At least 8 characters, mixture of upper and lower case letters, at least 1 number and 1 special character', '⚠ Password Requirements', {
        closeButton: true,
        disableTimeOut: true
      });
    }

    constructor(
      private auth: AuthService,
      private router: Router,
      private toaster: ToastrService
    ) {
        //
        this.widthOfWindow = window.screen.width;
    }

    onSubmit():void {
      //checking if all provided values are valid
      if (this.forenameIsValid == true && this.surnameIsValid == true && this.nicknameIsValid == true && this.dobIsValid == true && this.sexIsValid == true && this.emailIsValid == true && this.emailConfirmIsValid == true && this.passwordIsValid == true && this.passwordConfirmIsValid == true && this.securityQuestionValid == true && this.securityAnswerValid == true) {
        //all valid
        this.displayErrorText = false;

        const result = this.auth.doRegisterJSON(this.registerObject);

        if (result === true) {
          var result2 = this.auth.doLoginJSON(this.registerObject);
          if (result2 == true) {
            this.toaster.success('You have been logged in', 'Success!', {
              progressBar: true
            });
            this.router.navigate(['/dashboard']);  
          } else {
            this.toaster.warning('Unable to login - please try again', 'Error!', {
              progressBar: true
            });
            this.router.navigate(['/auth/login']); 
            //unable to login
          }
        }
      } else {
        //errors persist
        this.displayErrorText = true;

        this.toaster.warning('Unable to register - please try again', 'Error!', {
           progressBar: true
         });
      }
    }
}