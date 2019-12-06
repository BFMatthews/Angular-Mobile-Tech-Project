import { Component } from '@angular/core';
import { BookService } from '../../../services/book/book.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app-pages-general-books',
    templateUrl: './books.component.html',
    styleUrls: [ './books.component.css' ],
})
export class BooksComponent {
    private allBooks;
    private threeRandomBooks = [];
    private allBooksAscending = [];
    private threeMostRecentBooks = [];
    constructor(private book:BookService,private router:Router) {
      this.allBooks = this.book.getBooks();

      for (var i = 0; i < 5; i++) {
        var randomNumber = Math.floor(Math.random() * this.allBooks.length) + 1;
        this.threeRandomBooks.push(this.allBooks[randomNumber]);
      }
      
      this.allBooksAscending = this.allBooks.sort(function(a, b){return a.year - b.year});
      this.threeMostRecentBooks.push(this.allBooksAscending[this.allBooksAscending.length - 1]);
      this.threeMostRecentBooks.push(this.allBooksAscending[this.allBooksAscending.length - 2]);
      this.threeMostRecentBooks.push(this.allBooksAscending[this.allBooksAscending.length - 3]);
    }

    viewMoreClicked(bookISBN) {
      this.router.navigate(['/book/details'], { queryParams: { isbn: bookISBN}, queryParamsHandling: 'merge' });
    }
}