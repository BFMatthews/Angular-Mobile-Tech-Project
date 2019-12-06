import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'my-app-pages-book-filter',
    templateUrl: './book_filter.component.html',
    styleUrls: [ './book_filter.component.css' ],
})
export class BookFilterComponent {

    private filterResults;
    private filterResultsJSON;
    private widthOfWindow;
    private selectedBook;
    private displayExtra:boolean = false;

    private searchObject = {
      "title":"",
      "isbn":"",
      "author":"",
      "publication":""
    }

    constructor(private route:ActivatedRoute,private router:Router) {
      var result = "results" in this.route.queryParams['_value'];
      if (!result) {
        //results don't exist
      } else {
        this.filterResults = this.route.queryParams['_value']['results'];
        this.filterResultsJSON = JSON.parse(this.filterResults);
        console.log("JSON FILTER RESULT: ", this.filterResultsJSON);
      }
      this.widthOfWindow = window.screen.width;
    }

  onResize(event) {
    this.widthOfWindow = event.target.innerWidth;
  }

  viewBook(bookISBN) {
    this.router.navigate(['/book/details'], { queryParams: { isbn: bookISBN}, queryParamsHandling: 'merge' });
  }

  change(book) {
    this.selectedBook = book;
    this.displayExtra = true;

    var htmlElement = document.getElementById("filterDetails");
    htmlElement.scrollIntoView();
  }
}