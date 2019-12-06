//our root app component
import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { BookService } from '../services/book/book.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'my-app',
    templateUrl: './layout.component.html',
    styleUrls: [ './layout.component.css' ],
})
export class LayoutComponent {
    private showOldMenu:boolean = false;
    private widthOfWindowing;
    
    currentUser = null;
    constructor(private router: Router,private auth: AuthService,private toaster:ToastrService,private book:BookService ) {
        //
      this.auth.userAccountUpdated.subscribe(
        (newUserObj) => {
          console.log(this.currentUser);
          this.currentUser = null;
          this.currentUser = newUserObj;
          console.log(this.currentUser);
        }
      );

      var widthOfWindow = window.screen.width;
      this.widthOfWindowing = widthOfWindow;
      if (widthOfWindow < 576) {
        this.showOldMenu = true;
      } else {
        this.showOldMenu = false;
      }
    }

    doLogout():void {
      var result = this.auth.doLogout();

      if (result == true) {
        this.toaster.success('You have been logged out', 'Success!', {
           progressBar: true
         });
        this.router.navigate(['/auth/login']);
      } else {
        this.toaster.warning('Unable to logout - please try again', 'Error!', {
           progressBar: true
         });
        //error
      }
    }

    isLoggedIn():boolean {
      if (this.auth.theUser != null) {
        this.currentUser = this.auth.doGetUserObj(this.auth.theUser.email);
        return true;
      } else {
        return false;
      }
    }

  isAdmin():boolean {
    if (this.auth.theUser['permission'] == "admin") {
      return true;
    }
    return false;
  }

    isLibrarian():boolean {
    if (this.auth.theUser['permission'] == "librarian") {
      return true;
    }
    return false;
  }

  onResize(event) {
    var widthOfWindow = event.target.innerWidth;
    this.widthOfWindowing = widthOfWindow;
    if (widthOfWindow < 576) {
      this.showOldMenu = true;
    } else {
      this.showOldMenu = false;
    }
  }
}