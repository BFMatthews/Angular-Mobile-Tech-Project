import { Component, TemplateRef } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'my-app-pages-management-account_management',
    templateUrl: './account_management.component.html',
    styleUrls: [ './account_management.component.css' ],
})
export class AccountManagementComponent {
    modalRef: BsModalRef;
    message: string;

    private allUserAccounts;
    private displayAllAccounts:boolean = true;
    private displayAddAccount:boolean = false;

    private accountLocked = "";
    private lockedClass = "";
    private typeClass = "";
    private forenameClass = "";
    private surnameClass = "";
    private dobClass = "";
    private nicknameClass = "";
    private securityQuestionClass = "";
    private securityAnswerClass = "";
    private sexClass = "";
    private eyeClass = "far fa-eye";
    private emailConfirmClass = "";
    private emailClass = "";
    private passwordConfirmClass = "";
    private passwordClass = "";
    private displayAnswerClear: boolean = false;

    private clickedAccountEmailToDelete;
    private widthOfWindow;
    private displayExtra:boolean = false;
    private selectedAccountName;
    private selectedAccountPermission;
    private selectedAccountEmail;
    private selectedAccountLocked;

    registerObjectClear = {
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
      "permission":"",
      "securityQuestion":"",
      "securityAnswer":"",
      "locked":"",
      "loans":[]
    };

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
      "permission":"",
      "securityQuestion":"",
      "securityAnswer":"",
      "locked":null,
      "loans":[]
    };

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
    accountTypeValid:boolean = false;
    accountLockedValid:boolean = false;

    constructor(private auth:AuthService,private toaster:ToastrService,private router:Router,private modalService: BsModalService) {
      this.getAllAccounts();
      this.widthOfWindow = window.screen.width;
    }

    onResize(event) {
      this.widthOfWindow = event.target.innerWidth;
    }

    change(account) {
      this.selectedAccountName = account.forename + " " + account.surname;
      this.selectedAccountPermission = account.permission;
      this.selectedAccountEmail = account.email;
      this.selectedAccountLocked = account.locked;
      this.displayExtra = true;

      var htmlElement = document.getElementById("accountDetails");
      htmlElement.scrollIntoView();
    }

    resetForm() {
      this.forenameIsValid = false;
      this.surnameIsValid = false;
      this.nicknameIsValid = false;
      this.dobIsValid = false;
      this.sexIsValid = false;
      this.emailIsValid = false;
      this.emailConfirmIsValid = false;
      this.passwordIsValid = false;
      this.passwordConfirmIsValid = false;
      this.securityQuestionValid = false;
      this.securityAnswerValid = false;
      this.accountTypeValid = false;
      this.accountLockedValid = false;

      this.lockedClass = "";
      this.typeClass = "";
      this.forenameClass = "";
      this.surnameClass = "";
      this.dobClass = "";
      this.nicknameClass = "";
      this.securityQuestionClass = "";
      this.securityAnswerClass = "";
      this.sexClass = "";
      this.eyeClass = "far fa-eye";
      this.emailConfirmClass = "";
      this.emailClass = "";
      this.passwordConfirmClass = "";
      this.passwordClass = "";

      this.displayAnswerClear = false;
    }

    getAllAccounts() {
      this.allUserAccounts = this.auth.doGetAllUserAccounts();
    }

    unsuspendAccount(email) {
      var amendObj = {
        "locked":false
      }
      var result = this.auth.doUpdateAccount(email, amendObj);

      if (result == true) {
        this.toaster.success('Account successfully unlocked', 'Success!', {
          progressBar: true
        });
        this.getAllAccounts();
      } else {
        this.toaster.warning('Unable to unlock account - please try again', 'Error!', {
          progressBar: true
        });
      }
      this.displayExtra = false;
    }

    suspendAccount(email) {
      var amendObj = {
        "locked":true
      }
      var result = this.auth.doUpdateAccount(email, amendObj);

      if (result == true) {
        this.toaster.success('Account successfully locked', 'Success!', {
          progressBar: true
        });
        this.getAllAccounts();
      } else {
        this.toaster.warning('Unable to lock account - please try again', 'Error!', {
          progressBar: true
        });
      }
      this.displayExtra = false;
    }

    deleteAccount(template: TemplateRef<any>, email) {
      this.clickedAccountEmailToDelete = email;
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
      this.displayExtra = false;
      this.modalRef.hide();

      var result = this.auth.doDeleteAccount(this.clickedAccountEmailToDelete);

      if (result == true) {
        this.getAllAccounts();

        this.toaster.success('Account deletion successful', 'Success!', {
          progressBar: true
        });
      } else {
        this.toaster.warning('Unable to delete account - please try again', 'Error!', {
          progressBar: true
        });
      }
    }

    decline(): void {
      this.modalRef.hide();
    }

    viewAccount(email) {
      
    }

    allAccountsClicked() {
      this.displayAllAccounts = !this.displayAllAccounts;
    }

    addAccountClicked() {
      this.displayAddAccount = !this.displayAddAccount;
    }

    onSubmit() {
      if (this.forenameIsValid == true && this.surnameIsValid == true && this.nicknameIsValid == true && this.dobIsValid == true && this.sexIsValid == true && this.emailIsValid == true && this.emailConfirmIsValid == true && this.passwordIsValid == true && this.passwordConfirmIsValid == true && this.securityQuestionValid == true && this.securityAnswerValid == true && this.accountLockedValid == true && this.accountTypeValid == true) {
        //create account
        var result = this.auth.doRegisterJSON(this.registerObject);
        if (result == true) {
          this.getAllAccounts();
          this.displayAddAccount = false;
          this.resetForm();

          this.registerObject = this.registerObjectClear;

          this.toaster.success('Account registration successful', 'Success!', {
            progressBar: true
          });
        } else {
          this.toaster.warning('Unable to register - please try again', 'Error!', {
            progressBar: true
          });
        }
      } else {
        this.toaster.warning('Unable to register - please check your entries before trying again', 'Error!', {
          progressBar: true
        });
      }
    }

    typeChange() {
      this.typeClass = "is-valid";
      this.accountTypeValid = true;
    }

    lockedChange() {
      if (this.accountLocked == "true") {
        this.registerObject.locked = true;
      } else {
        this.registerObject.locked = false;
      }
      this.lockedClass = "is-valid";
      this.accountLockedValid = true;
    }

    forenameChange():void {
      this.forenameIsValid = false;
      if (this.registerObject.forename == "" || this.registerObject.forename == undefined) {
        this.forenameClass = "is-invalid";
      } else {
        this.forenameClass = "is-valid";
        this.forenameIsValid = true;
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

    securityQuestionChange():void {
      this.securityQuestionClass = "is-valid";
      this.securityQuestionValid = true;
    }

    sexChange():void {
      this.sexClass = "is-valid";
      this.sexIsValid = true;
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

    displayAnswer(): void {
      this.displayAnswerClear = !this.displayAnswerClear;
      if (this.displayAnswerClear) {
        this.eyeClass = "far fa-eye-slash";
      } else {
        this.eyeClass = "far fa-eye";
      }
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

    amendAccountDetails(email) {
      this.router.navigate(['/management/account_edit'], { queryParams: { email: email}, queryParamsHandling: 'merge' });
    }
}