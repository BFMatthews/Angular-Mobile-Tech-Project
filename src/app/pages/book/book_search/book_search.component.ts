import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'my-app-pages-book-search',
    templateUrl: './book_search.component.html',
    styleUrls: [ './book_search.component.css' ],
})
export class BookSearchComponent {
    private searchResults;
    private searchResultsJSON;
    private widthOfWindow;
    private displayExtra:boolean = false;
    private selectedBookISBN;
    private selectedBookYear;
    private selectedBookTitle;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
    ) {
      var result = "results" in this.route.queryParams['_value'];
      if (!result) {
        //results don't exist
      } else {
        this.searchResults = this.route.queryParams['_value']['results'];
        this.searchResultsJSON = JSON.parse(this.searchResults);
        console.log("JSON RESULT: ", this.searchResultsJSON);
      }

      this.widthOfWindow = window.screen.width;
    }

    viewBook(bookISBN) {
      this.router.navigate(['/book/details'], { queryParams: { isbn: bookISBN}, queryParamsHandling: 'merge' });
    }

    onResize(event) {
      this.widthOfWindow = event.target.innerWidth;
    }

    change(book) {
      this.selectedBookISBN = book.isbn;
      this.selectedBookYear = book.year;
      this.selectedBookTitle = book.title;
      this.displayExtra = true;

      var htmlElement = document.getElementById("bookDetails");
      htmlElement.scrollIntoView();
    }
}