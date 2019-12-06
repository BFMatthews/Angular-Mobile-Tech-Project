import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../../services/book/book.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'my-app-pages-book-details',
    templateUrl: './book_details.component.html',
    styleUrls: [ './book_details.component.css' ],
})
export class BookDetailsComponent {
    private isbn: string;
    private bookObj = undefined;
    private allReviews;
    private allReviewsForThisBook = [];
    private allRequestsForThisBook = [];
    private allReturnsForThisBook = [];
    private userEmail = "";
    private reviewAlreadyExist:boolean = false;
    private currentReviewDate = null;
    private requestSubmitted:boolean = false;
    private requestReturnSubmitted:boolean = false;
    private onLoan:boolean = false;

    private colouringStar1 = false;
    private colouringStar2 = false;
    private colouringStar3 = false;
    private colouringStar4 = false;
    private colouringStar5 = false;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private _location:Location,
      private toaster:ToastrService,
      private book:BookService,
      private auth:AuthService,
    ) {
      //checking if the isbn parameter has been passed through
      var result = "isbn" in this.route.queryParams['_value'];
      
      if (!result) {
        this.toaster.warning('Unable to retrieve book details - please try again', 'Error!', {
           progressBar: true
         });
        this._location.back();
      } else {
        this.isbn = this.route.queryParams['_value']['isbn'];
        this.bookObj = this.book.getBookDetails(this.isbn);
        // this.toaster.success('Book details successfully retrieved', 'Success!', {
        //    progressBar: true
        //  });
      }

        if (this.isLoggedIn()) {
          //logged in
          this.allReviews = this.book.getReviews();
          for (var j = 0; j < this.allReviews.length; j++) {
            if (this.allReviews[j].isbn == this.isbn) {
              //this is a matched book
              this.allReviewsForThisBook.push(this.allReviews[j]);
            }
          }

          var loggedInUserEmail = this.auth.doGetUserEmail();
          this.userEmail = loggedInUserEmail;
          var currentBookReviewObj;

          for (var u = 0; u < this.allReviewsForThisBook.length; u++) {
            if (loggedInUserEmail == this.allReviewsForThisBook[u].reviewee) {
              this.reviewAlreadyExist = true;
              this.currentReviewDate = this.allReviewsForThisBook[u].date;
              currentBookReviewObj = this.allReviewsForThisBook[u];
              this.starClicked(parseInt(currentBookReviewObj.stars));
              break;
            }
          }

          //1. Check whether book is out on loan
          var userObj = this.auth.doGetUserObj(loggedInUserEmail);
          var userLoans = [];
          if (userObj != null) {
            userLoans = userObj.loans;
          }
          
          for (var e = 0; e < userLoans.length; e++) {
            var currentObj = userLoans[e];
            if (currentObj.isbn == this.isbn) {
              //this book is on loan - display submit return
              this.onLoan = true;

              var allReturns = this.book.getReturns();
              for (var j = 0; j < allReturns.length; j++) {
                if (allReturns[j].isbn == this.isbn) {
                  this.allReturnsForThisBook.push(allReturns[j]);
                }
              }

              for (var u = 0; u < this.allReturnsForThisBook.length; u++) {
                if (loggedInUserEmail == this.allReturnsForThisBook[u].email) {
                  this.requestReturnSubmitted = true;
                  break;
                }
              }
            }
          }

          if (!this.onLoan) {
            //2. Check whether book is requested
            var allRequests = this.book.getRequests();
            for (var j = 0; j < allRequests.length; j++) {
              if (allRequests[j].isbn == this.isbn) {
                this.allRequestsForThisBook.push(allRequests[j]);
              }
            }

            for (var u = 0; u < this.allRequestsForThisBook.length; u++) {
              if (loggedInUserEmail == this.allRequestsForThisBook[u].email) {
                this.requestSubmitted = true;
                break;
              }
            }
          }
        } else {}
     }

    starClickedHTML(starClicked) {
      this.starClicked(starClicked);
      this.currentReviewDate = new Date();

      var aReview = {
        "isbn":this.isbn,
        "reviewee":this.userEmail,
        "stars":starClicked,
        "date":new Date(),
      }

      if (this.reviewAlreadyExist == true) {
        //replace rather than adding new
        var result2 = this.book.replaceReview(aReview);
        if (result2 == true) {
          this.toaster.success('Book review successfully amended', 'Success!', {
            progressBar: true
          });
        } else {
          this.toaster.warning('Unable to amend review - please try again', 'Error!', {
            progressBar: true
          });
        }
      } else {
        //add new review to array
        var result = this.book.addReview(aReview);
        if (result == true) {
          this.reviewAlreadyExist = true;
          this.toaster.success('Book review successfully added', 'Success!', {
            progressBar: true
          });
        } else {
          this.toaster.warning('Unable to save review - please try again', 'Error!', {
            progressBar: true
          });
        }
      }
    }

     starClicked(starClicked) {
       this.colouringStar1 = false;
       this.colouringStar2 = false;
       this.colouringStar3 = false;
       this.colouringStar4 = false;
       this.colouringStar5 = false;

       switch(starClicked) {
         case 1:
         this.colouringStar1 = true;
         break;
         case 2:
         this.colouringStar1 = true;
         this.colouringStar2 = true;
         break;
         case 3:
         this.colouringStar1 = true;
         this.colouringStar2 = true;
         this.colouringStar3 = true;
         break;
         case 4:
         this.colouringStar1 = true;
         this.colouringStar2 = true;
         this.colouringStar3 = true;
         this.colouringStar4 = true;
         break;
         case 5:
         this.colouringStar1 = true;
         this.colouringStar2 = true;
         this.colouringStar3 = true;
         this.colouringStar4 = true;
         this.colouringStar5 = true;
         break;
       }
     }

     isLoggedIn():boolean {
      if (this.auth.theUser != null) {
        return true;
      } else {
        return false;
      }
    }

    cancelRequest(isbn) {
      var result = this.book.doCancelUserRequest(isbn, this.userEmail);
      if (result == true) {
        this.toaster.success('Book request cancelled', 'Success!', {
          progressBar: true
        });
        this.requestSubmitted = false;
      } else {
        this.toaster.warning('Unable to cancel request - please try again', 'Error!', {
          progressBar: true
        });
      }
    }

    cancelReturn(isbn) {
      var result = this.book.doCancelUserReturn(isbn, this.userEmail);
      if (result == true) {
        this.toaster.success('Book return cancelled', 'Success!', {
          progressBar: true
        });
        this.requestReturnSubmitted = false;
      } else {
        this.toaster.warning('Unable to cancel return - please try again', 'Error!', {
          progressBar: true
        });
      }
    }

    submitRequest(isbn,title) {
      var aRequest = {
        "title":title,
        "isbn":isbn,
        "date":new Date(),
        "email": this.userEmail
      }

      var result = this.book.addRequest(aRequest);

      if (result == true) {
        //successfully added
        this.toaster.success('Book request submitted', 'Success!', {
          progressBar: true
        });
        this.requestSubmitted = true;
      } else {
        //request not added
        this.toaster.warning('Unable to send request - please try again', 'Error!', {
          progressBar: true
        });
      }
    }

    submitReturn(isbn,title) {
      var aReturn = {
        "title":title,
        "isbn":isbn,
        "date":new Date(),
        "email": this.userEmail
      }

      var result = this.book.addReturn(aReturn);

      if (result == true) {
        //successfully added
        this.toaster.success('Book return submitted', 'Success!', {
          progressBar: true
        });
        this.requestReturnSubmitted = true;
      } else {
        //request not added
        this.toaster.warning('Unable to send return - please try again', 'Error!', {
          progressBar: true
        });
      }

    }
}
