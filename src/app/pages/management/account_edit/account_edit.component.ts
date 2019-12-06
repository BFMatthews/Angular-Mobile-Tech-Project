import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'my-app-pages-management-account_edit',
    templateUrl: './account_edit.component.html',
    styleUrls: [ './account_edit.component.css' ],
})
export class AccountEditComponent {
  private email;
  private userObj;
  private userObjEdit;
  private widthOfWindow;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private _location:Location,
      private toaster:ToastrService,
      private auth:AuthService,
    ) {
      var result = "email" in this.route.queryParams['_value'];
      
      if (!result) {
        this.toaster.warning('Unable to retrieve user details - please try again', 'Error!', {
           progressBar: true
         });
        this._location.back();
      } else {
        this.email = this.route.queryParams['_value']['email'];
        this.userObj = this.auth.doGetUserObj(this.email);
        this.userObjEdit = this.userObj;
        console.log(this.userObjEdit);
      }
      this.widthOfWindow = window.screen.width;
    }

    onResize(event) {
      this.widthOfWindow = event.target.innerWidth;
    }

    onSubmit() {
      if (this.userObjEdit.locked == "true") {
        this.userObjEdit.locked = true;
      } else {
        this.userObjEdit.locked = false;
      }

      var result = this.auth.doUpdateAccount(this.userObjEdit.email, this.userObjEdit);
      if (result == true) {
        this.router.navigate(['/management/account']); 

        this.toaster.success('Account successfully updated', 'Success!', {
          progressBar: true
        });
      } else {
        this.toaster.warning('Unable to update account details - please try again', 'Error!', {
           progressBar: true
         });
      }
    }
}