import { Component, TemplateRef } from '@angular/core';
import { BookService } from '../../../services/book/book.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'my-app-pages-management-book_management',
    templateUrl: './book_management.component.html',
    styleUrls: [ './book_management.component.css' ],
})
export class BookManagementComponent {
    private displayAddBook:boolean = false;
    private displayAllBooks:boolean = true;
    private displayBookActioning:boolean = false;
    private displayBookReturnActioning:boolean = false;
    private allBooks;
    private allBookRequests;
    private allBookReturns;
    private bookAvailable = "";
    private searchTerm = ""; 
    private searchResults;
    private displaySearchBook:boolean = false;

    modalRef: BsModalRef;
    message: string;

    newBookObject = {
      "title":"",
      "author":"",
      "isbn":"",
      "year":"",
      "image":"",
      "status":"",
    };

    newBookObjectClear = {
      "title":"",
      "author":"",
      "isbn":"",
      "year":"",
      "image":"",
      "status":"",
    };

    private titleClass = "";
    private authorClass = "";
    private isbnClass = "";
    private yearClass = "";
    private imageClass = "";
    private statusClass = "";

    private titleIsValid = false;
    private authorIsValid = false;
    private isbnIsValid = false;
    private yearIsValid = false;
    private imageIsValid = false;
    private statusIsValid = false;
    
    private clickedBookISBNToDelete;
    private widthOfWindow;

    private selectedBookTitle;
    private selectedBookISBN;
    private selectedBookYear;
    private displayExtra:boolean = false;

    private selectedBookTitle2;
    private selectedBookISBN2;
    private selectedBookYear2;
    private displayExtra2:boolean = false;

    private selectedBookRequest;
    private displayExtra3:boolean = false;

    private selectedBookReturn;
    private displayExtra4:boolean = false;

    constructor(
      private book:BookService,
      private toaster:ToastrService,
      private modalService: BsModalService,
      private router:Router,
      private auth:AuthService
      ) {
      this.getAllBooks();
      this.getAllBookRequests();
      this.getAllBookReturns();
      this.widthOfWindow = window.screen.width;
    }

    change(book) {
      this.selectedBookISBN = book.isbn;
      this.selectedBookTitle = book.title;
      this.selectedBookYear = book.year;
      this.displayExtra = true;

      var htmlElement = document.getElementById("bookDetails");
      htmlElement.scrollIntoView();
    }

    change2(book) {
      this.selectedBookISBN2 = book.isbn;
      this.selectedBookTitle2 = book.title;
      this.selectedBookYear2 = book.year;
      this.displayExtra2 = true;

      var htmlElement = document.getElementById("bookDetails2");
      htmlElement.scrollIntoView();
    }

    change3(book) {
      this.selectedBookRequest = book;
      this.displayExtra3 = true;

      var htmlElement = document.getElementById("bookRequestDetails");
      htmlElement.scrollIntoView();
    }

    change4(book) {
      this.selectedBookReturn = book;
      this.displayExtra4 = true;

      var htmlElement = document.getElementById("bookReturnDetails");
      htmlElement.scrollIntoView();
    }

    onResize(event) {
      this.widthOfWindow = event.target.innerWidth;
    }

    allBooksClicked() {
      this.displayAllBooks = !this.displayAllBooks;
    }

    displayActionClicked() {
      this.displayBookActioning = !this.displayBookActioning;

      if (this.displayBookActioning == true) {
        this.displayAllBooks = false;
        this.displayAddBook = false;
        this.displayBookReturnActioning = false;
      } else {
        this.displayAllBooks = true;
        this.displayAddBook = false;
        this.displayBookReturnActioning = false;
      }
    }

    addBookClicked() {
      this.displayAddBook = !this.displayAddBook;
    }

    searchBookClicked() {
      this.displaySearchBook = !this.displaySearchBook;
    }

    getAllBooks() {
      this.allBooks = this.book.getBooks();
    }

    getAllBookRequests() {
      this.allBookRequests = this.book.getRequests();
      if (this.allBookRequests.length == 0) {
        this.displayAllBooks = true;
        this.displayAddBook = false;
      }
    }

    getAllBookReturns() {
      this.allBookReturns = this.book.getReturns();
      if (this.allBookReturns.length == 0) {
        this.displayAllBooks = true;
        this.displayAddBook = false;
      }
    }

    grantRequestReturn(returnObj) {
      var result = this.auth.doRemoveBookRental(returnObj.email, returnObj);
      if (result == true) {
        var result2 = this.book.denyReturnRequest(returnObj);
        if (result2 == true) {
          var newData = {
            "status":"available"
          }
          var result3 = this.book.doUpdateBook(returnObj.isbn, newData);

          if (result3 == true) {
            this.displayAllBooks = true;
            this.displayAddBook = false;
            this.displayBookActioning = false;
            this.displayBookReturnActioning = false;
            this.toaster.success('Return successfully granted', 'Success!', {
              progressBar: true
            });
          } else {
            this.toaster.warning('Unable to update book status - please try again', 'Error!', {
              progressBar: true
            });
          }
        } else {
          this.toaster.warning('Unable to remove request - please try again', 'Error!', {
            progressBar: true
          });
        }
      } else {
        this.toaster.warning('Unable to action request - please try again', 'Error!', {
          progressBar: true
        });
      }
    }

    grantRequest(rentalObj) {
      var date:Date = rentalObj.date;
      var newDate:Date = new Date();
      newDate.setDate(date.getDate()+7);
      
      var aRental = {
        "title":rentalObj.title,
        "isbn":rentalObj.isbn,
        "requestDate":rentalObj.date,
        "email":rentalObj.email,
        "maxReturnDate":newDate
      }

      // attempt to add request to user obj
      var result = this.auth.doAddBookRental(rentalObj.email, aRental);
      if (result == true) {
        //attempt to remove request from list
        var result2 = this.book.denyRequest(rentalObj);
        if (result2 == true) {
          //change book status to be not available
          var newData = {
            "status":"on-loan"
          }
          var result3 = this.book.doUpdateBook(rentalObj.isbn, newData);

          if (result3 == true) {
            this.displayAllBooks = true;
            this.displayAddBook = false;
            this.displayBookActioning = false;
            this.displayBookReturnActioning = false;
            this.toaster.success('Request successfully granted', 'Success!', {
              progressBar: true
            });
          } else {
            this.toaster.warning('Unable to update book status - please try again', 'Error!', {
              progressBar: true
            });
          }
        } else {
          this.toaster.warning('Unable to remove request - please try again', 'Error!', {
            progressBar: true
          });
        }
      } else {
        //book loan failed
        this.toaster.warning('Unable to action request - please try again', 'Error!', {
          progressBar: true
        });
      }
    }

    denyRequest(requestObj) {
      var result = this.book.denyRequest(requestObj);
      if (result == true) {
        this.getAllBookRequests();
        this.toaster.success('Request successfully denied', 'Success!', {
          progressBar: true
        });
      } else {
        this.toaster.warning('Unable to action request - please try again', 'Error!', {
          progressBar: true
        });
      }
    }

    resetForm() {
      this.isbnIsValid = false;
      this.authorIsValid = false;
      this.imageIsValid = false;
      this.statusIsValid = false;
      this.titleIsValid = false;
      this.yearIsValid = false;

      this.authorClass = "";
      this.imageClass = "";
      this.isbnClass = "";
      this.statusClass = "";
      this.titleClass = "";
      this.yearClass = "";
    }

    displayActionReturnClicked() {
      this.displayBookReturnActioning = !this.displayBookReturnActioning;

      if (this.displayBookReturnActioning == true) {
        this.displayAllBooks = false;
        this.displayAddBook = false;
        this.displayBookActioning = false;
      } else {
        this.displayAllBooks = true;
        this.displayAddBook = false;
        this.displayBookActioning = false;
      }
    }

    onSubmit() {
      console.log(this.newBookObject);

      if (this.isbnIsValid == true && this.authorIsValid == true && this.imageIsValid == true && this.statusIsValid == true && this.titleIsValid == true && this.yearIsValid == true) {
        //create new book
        var result = this.book.doAddBook(this.newBookObject);
        if (result == true) {
          this.getAllBooks();
          this.displayAddBook = false;
          this.displayAllBooks = true;
          this.resetForm();

          this.newBookObject = this.newBookObjectClear;

          this.toaster.success('Book addition successful', 'Success!', {
            progressBar: true
          });
        } else {
          this.toaster.warning('Unable to add book - please try again', 'Error!', {
            progressBar: true
          });
        }
      } else {
        this.toaster.warning('Unable to add book - please check your entries before trying again', 'Error!', {
          progressBar: true
        });
      }
    }

    titleChange() {
      this.titleIsValid = false;
      if (this.newBookObject.title == "" || this.newBookObject.title == undefined) {
        this.titleClass = "is-invalid";
      } else {
        this.titleIsValid = true;
        this.titleClass = "is-valid";
      }
    } 

    authorChange() {
      this.authorIsValid = false;
      if (this.newBookObject.author == "" || this.newBookObject.author == undefined) {
        this.authorClass = "is-invalid";
      } else {
        this.authorIsValid = true;
        this.authorClass = "is-valid";
      }
    }

    isbnChange() {
      this.isbnIsValid = false;
      if (this.newBookObject.isbn == "" || this.newBookObject.isbn == undefined) {
        this.isbnClass = "is-invalid";
      } else {
        this.isbnIsValid = true;
        this.isbnClass = "is-valid";
      }
    }

    yearChange() {
      this.yearIsValid = false;
      if (this.newBookObject.year == "" || this.newBookObject.year == undefined) {
        this.yearClass = "is-invalid";
      } else {
        this.yearIsValid = true;
        this.yearClass = "is-valid";
      }
    }

    imageChange() {
      this.imageIsValid = false;
      if (this.newBookObject.image == "" || this.newBookObject.image == undefined) {
        this.imageClass = "is-invalid";
      } else {
        this.imageIsValid = true;
        this.imageClass = "is-valid";
      }
    }

    statusChange() {
      this.statusClass = "is-valid";
      this.statusIsValid = true;

      if (this.bookAvailable == "available") {
        this.newBookObject.status = "available";
      } else {
        this.newBookObject.status = "not-available";
      }
    }

    deleteBook(template: TemplateRef<any>, isbn) {
      this.clickedBookISBNToDelete = isbn;
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
      this.displayExtra = false;
      this.modalRef.hide();
      var result = this.book.doDeleteBook(this.clickedBookISBNToDelete);

      if (result == true) {
        this.getAllBooks();

        this.toaster.success('Book deletion successful', 'Success!', {
          progressBar: true
        });
      } else {
        this.toaster.warning('Unable to delete book - please try again', 'Error!', {
          progressBar: true
        });
      }
    }
 
    decline(): void {
      this.modalRef.hide();
    }

    amendBookDetails(isbn) {
      this.router.navigate(['/management/book_edit'], { queryParams: { isbn: isbn}, queryParamsHandling: 'merge' });
    }

    denyRequestReturn(returnObj) {
      var result = this.book.denyReturnRequest(returnObj);
      if (result == true) {
        this.getAllBookReturns();
        this.toaster.success('Request successfully denied', 'Success!', {
          progressBar: true
        });
      } else {
        this.toaster.warning('Unable to action request - please try again', 'Error!', {
          progressBar: true
        });
      }
    }

    statusChangeSearch() {
      this.displayExtra2 = false;
      this.searchResults = this.book.doSearchBooksLibrarian(this.searchTerm);
    }
}