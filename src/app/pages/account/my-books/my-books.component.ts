import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { BookService } from '../../../services/book/book.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'my-app-pages-account-my-books',
    templateUrl: './my-books.component.html',
    styleUrls: [ './my-books.component.css' ],
})
export class MyBooksComponent {
  private widthOfWindow;
  private userLoans;
  private currentUserReturns = [];
  private userPendingReturns;
  private userPendingRequests;
  private userEmail;
  private userOverdue = [];

  private displayLoanedBooks:boolean = true;
  private displayPendingReturns:boolean = false;
  private displayPendingLoans:boolean = false;
  private displayOverdue:boolean = false;

  private displayExtra:boolean = false;
  private displayExtra2:boolean = false;
  private displayExtra3:boolean = false;
  private displayExtra4:boolean = false;
  private selectedBook;
  private selectedBook2;
  private selectedBook3;
  private selectedBook4;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthService,
    private book:BookService,
    private toaster:ToastrService,
    private _location:Location) 
    {
      this.widthOfWindow = window.screen.width;

      var result = "email" in this.route.queryParams['_value'];
      if (!result) {
        //results don't exist
        this.toaster.warning('Unable to obtain user loans - please try again', 'Error!', {
           progressBar: true
         });
        this._location.back();
      } else {
        this.userEmail = this.route.queryParams['_value']['email'];

        this.userLoans = this.auth.doGetUserRentals(this.userEmail);
        this.userPendingReturns = this.book.getReturns();
        this.currentUserReturns = this.userPendingReturns;
        this.userPendingRequests = this.book.getRequests();
      }
  }

  viewBookDetails(isbn) {
    this.router.navigate(['/book/details'], { queryParams: { isbn: isbn}, queryParamsHandling: 'merge' });
  }

  submitReturn(returnObj) {
    var aReturn = {
        "title":returnObj.title,
        "isbn":returnObj.isbn,
        "date":new Date(),
        "email": this.userEmail
      }

      var result = this.book.addReturn(aReturn);
      if (result == true) {
        this.toaster.success('Book return submitted', 'Success!', {
          progressBar: true
        });

        this.changeMade();
      
      } else {
        this.toaster.warning('Unable to send return - please try again', 'Error!', {
          progressBar: true
        });
      }
  }

  loanedBooksClicked() {
    this.displayLoanedBooks = !this.displayLoanedBooks;
  }

  pendingReturnsClicked() {
    this.displayPendingReturns = !this.displayPendingReturns;
  }

  pendingLoansClicked() {
    this.displayPendingLoans = !this.displayPendingLoans;
  }

  overdueClicked() {
    this.displayOverdue = !this.displayOverdue;
  }

  onResize(event) {
    this.widthOfWindow = event.target.innerWidth;
  }

  change(book, num) {
    switch(num) {
      case 1:
        this.selectedBook = book;
        this.displayExtra = true;
        var htmlElement = document.getElementById("bookDetails");
        htmlElement.scrollIntoView();
        break;
      case 2:
        this.selectedBook2 = book;
        this.displayExtra2 = true;
        var htmlElement = document.getElementById("bookDetails2");
        htmlElement.scrollIntoView();
        break;
      case 3:
        this.selectedBook3 = book;
        this.displayExtra3 = true;
        var htmlElement = document.getElementById("bookDetails3");
        htmlElement.scrollIntoView();
        break;
      case 4:
        this.selectedBook4 = book;
        this.displayExtra4 = true;
        var htmlElement = document.getElementById("bookDetails4");
        htmlElement.scrollIntoView();
        break;
    }
  }

  cancelReturn(book) {
    console.log(this.userEmail);
    console.log("BEFORE:", this.auth.doGetUserRentals(this.userEmail));

    var result = this.book.doCancelUserReturn(book.isbn, this.userEmail);
    if (result == true) {
      this.toaster.success('Book return cancelled', 'Success!', {
        progressBar: true
      });
      this.changeMade();
    } else {
      this.toaster.warning('Unable to cancel return - please try again', 'Error!', {
        progressBar: true
      });
    }
  }

  cancelLoan(book) {
    var result = this.book.doCancelUserRequest(book.isbn, this.userEmail);
    if (result == true) {
      this.toaster.success('Book request cancelled', 'Success!', {
        progressBar: true
      });
      this.changeMade();
    } else {
      this.toaster.warning('Unable to cancel request - please try again', 'Error!', {
        progressBar: true
      });
    }
  }

  changeMade() {
    this.router.navigate(['/dashboard']);
  }
}