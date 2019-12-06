import { Component } from '@angular/core';
import { BookService } from '../../../services/book/book.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'my-app-pages-book-list',
    templateUrl: './book_list.component.html',
    styleUrls: [ './book_list.component.css' ],
})
export class BookListComponent {
    private allBooks = [];
    private stackedBooks = [];
    private currentStackedBooks = [];
    private stackedBooks2s = [];
    private currentStackedBooks2s = [];
    private stackedBooks1s = [];
    private currentStackedBooks1s = [];
    private startNumber = 3;
    private startNumber2s = 3;
    private startNumber1s = 3;
    private widthOfWindow;
    private selecting = "default";

    private searchObject = {
      "title":"",
      "isbn":"",
      "author":"",
      "publication":""
    }

    doFilter() {
      console.log(this.selecting);
      var searchResults:any[] = this.book.doSearchBooksLibrarian(this.selecting);
      console.log(searchResults);

      if (searchResults == [] || searchResults.length == 0) {
        this.toaster.warning('No books to display', 'Filter Result!', {
           progressBar: true
         });
      } else {
        this.router.navigate(['/book/filter'], {queryParams: {results: JSON.stringify(searchResults) }});
      }
    }

    onResize(event) {
      this.widthOfWindow = event.target.innerWidth;
    }

    constructor(private book:BookService,private router:Router,private toaster:ToastrService) {
      this.widthOfWindow = window.screen.width;

      this.allBooks = this.book.getBooks();

      var current3 = [];
      var current2 = [];
      var current1 = [];
      for (var i = 0; i < this.allBooks.length; i++) {
        current3.push(this.allBooks[i]);
        current2.push(this.allBooks[i]);
        current1.push(this.allBooks[i]);

        if (this.allBooks.length - i >= 2) {
          if (current3.length == 3) {
            this.stackedBooks.push(current3);
            current3 = [];
          }
          if (current2.length == 2) {
            this.stackedBooks2s.push(current2);
            current2 = [];
          }
        } else {
          this.stackedBooks.push(current3);
          this.stackedBooks2s.push(current2);
        }
      }

      for (var i = 0; i < 3; i++) {
        this.currentStackedBooks1s.push(current1[i]);
      }

      console.log(this.currentStackedBooks1s);

      this.currentStackedBooks.push(this.stackedBooks[0]);
      this.currentStackedBooks.push(this.stackedBooks[1]);
      this.currentStackedBooks.push(this.stackedBooks[2]);

      this.currentStackedBooks2s.push(this.stackedBooks2s[0]);
      this.currentStackedBooks2s.push(this.stackedBooks2s[1]);
      this.currentStackedBooks2s.push(this.stackedBooks2s[2]);
      // console.log(this.currentStackedBooks);
    }

    viewMoreClicked(bookISBN) {
      this.router.navigate(['/book/details'], { queryParams: { isbn: bookISBN}, queryParamsHandling: 'merge' });
    }

    getNext9() {
      this.currentStackedBooks = [];
      for (var i = 0; i < 3; i++) {
        this.currentStackedBooks.push(this.stackedBooks[this.startNumber]);
        this.startNumber = this.startNumber + 1;
      }
      var currentStack = [];
      for (var j = 0; j < this.currentStackedBooks.length; j++) {
        if (this.currentStackedBooks[j] != undefined) {
          currentStack.push(this.currentStackedBooks[j]);
        }
      }

      this.currentStackedBooks = [];
      this.currentStackedBooks = currentStack;
    }

    getPrevious9() {
      this.currentStackedBooks = [];
      this.startNumber = this.startNumber - 6;
      for (var i = 0; i < 3; i++) {
        this.currentStackedBooks.push(this.stackedBooks[this.startNumber]);
        this.startNumber = this.startNumber + 1;
      }
    }

    getNext6() {
      this.currentStackedBooks2s = [];
      for (var i = 0; i < 3; i++) {
        this.currentStackedBooks2s.push(this.stackedBooks2s[this.startNumber2s]);
        this.startNumber2s = this.startNumber2s + 1;
      }
      var currentStack = [];
      for (var j = 0; j < this.currentStackedBooks2s.length; j++) {
        if (this.currentStackedBooks2s[j] != undefined) {
          currentStack.push(this.currentStackedBooks2s[j]);
        }
      }

      this.currentStackedBooks2s = [];
      this.currentStackedBooks2s = currentStack;
    }

    getPrevious6() {
      this.currentStackedBooks2s = [];
      this.startNumber2s = this.startNumber2s - 6;
      for (var i = 0; i < 3; i++) {
        this.currentStackedBooks2s.push(this.stackedBooks2s[this.startNumber2s]);
        this.startNumber2s = this.startNumber2s + 1;
      }
    }

    getNext3() {
      this.currentStackedBooks1s = [];
      for (var i = 0; i < 3; i++) {
        this.currentStackedBooks1s.push(this.allBooks[this.startNumber1s]);
        this.startNumber1s = this.startNumber1s + 1;
      }

      var currentStack = [];
      for (var j = 0; j < this.currentStackedBooks1s.length; j++) {
        if (this.currentStackedBooks1s[j] != undefined) {
          currentStack.push(this.currentStackedBooks1s[j]);
        }
      }

      this.currentStackedBooks1s = [];
      this.currentStackedBooks1s = currentStack;
    }

    getPrevious3() {
      this.currentStackedBooks1s = [];
      this.startNumber1s = this.startNumber1s - 6;
      for (var i = 0; i < 3; i++) {
        this.currentStackedBooks1s.push(this.allBooks[this.startNumber1s]);
        this.startNumber1s = this.startNumber1s + 1;
      }
    }

    onSubmit() {
      for (var item in this.searchObject) { 
        if (this.searchObject[item] === null || this.searchObject[item] === undefined || this.searchObject[item] === "") {
          delete this.searchObject[item];
        }
      }
      var result:any[] = this.book.doSearchBooks(this.searchObject);
      console.log("result:", result);

      if (result == undefined || result.length == 0) {
        this.toaster.warning('No books have been matched from your search', 'Search Result!', {
           progressBar: true
         });
      } else {
        this.router.navigate(['/book/search'], {queryParams: {results: JSON.stringify(result) }});
      }
    }
}