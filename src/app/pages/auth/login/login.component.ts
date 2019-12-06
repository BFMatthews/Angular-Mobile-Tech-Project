import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth/auth.service";
import { User } from "../models/user.class";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "my-app-pages-auth-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: User;
  loginObject = {
    email: "",
    password: ""
  };
  numberOfFailedLogins = 0;

  widthOfWindow;

  displayErrorText: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toaster: ToastrService
  ) {
    this.widthOfWindow = window.screen.width;
  }

  onResize(event) {
    this.widthOfWindow = event.target.innerWidth;
  }

  ngOnInit() {
    //this.setupNewUser();
  }

  setupNewUser() {
    //this.user = new User();
  }

  onSubmit() {
    this.displayErrorText = false;

    var accountExists = this.auth.doAccountExist(this.loginObject.email);
    //1. Check if account exists
    if (accountExists == true) {
      //2. Check if account is already locked
      var locked = this.auth.doCheckLocked(this.loginObject.email);
      if (locked == true) {
        this.toaster.error(
          "Unable to login - your account is locked. Please contact your system administrator.",
          "Error!",
          { progressBar: true }
        );
      } else {
        //3. Attempt Login
        var result2 = this.auth.doLoginJSON(this.loginObject);
        if (result2 == true) {
          this.toaster.success("You have been logged in", "Success!", {
            progressBar: true
          });
          this.numberOfFailedLogins = 0;
          this.router.navigate(["/dashboard"]);
        } else {
          this.toaster.warning("Invalid login credentials", "Error!", {
            progressBar: true
          });
          
          var isAdmin = this.auth.doAccountAdminCheck(this.loginObject.email);
          (isAdmin) ? this.numberOfFailedLogins=0 : this.numberOfFailedLogins = this.numberOfFailedLogins + 1;

          if (this.numberOfFailedLogins == 3 && !isAdmin) {
            var amendObj = {
              "locked": true
            };
            //5. Lock account
            var result = this.auth.doUpdateAccount(
              this.loginObject.email,
              amendObj
            );
            if (result == true) {
              this.toaster.error(
                "Too many failed login attempts - your account is now locked. Please contact your system administrator.",
                "Error!",
                { closeButton: true, disableTimeOut: true }
              );
              this.numberOfFailedLogins = 0;
            } else {
              this.toaster.warning("Failed to lock user account", "Error!", {
                progressBar: true
              });
            }
          }
        }
      }
    } else {
      this.toaster.warning("Invalid login credentials", "Error!", {
        progressBar: true
      });
    }
  }
}
