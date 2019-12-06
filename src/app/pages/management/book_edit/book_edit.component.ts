import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../../../services/book/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'my-app-pages-management-book_edit',
    templateUrl: './book_edit.component.html',
    styleUrls: [ './book_edit.component.css' ],
})
export class BookEditComponent {
  private isbn;
  private bookObj;
  private bookObjEdit;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private _location:Location,
      private book:BookService,
      private toaster:ToastrService,
    ) {
      var result = "isbn" in this.route.queryParams['_value'];
      
      if (!result) {
        this.toaster.warning('Unable to retrieve book details - please try again', 'Error!', {
           progressBar: true
         });
        this._location.back();
      } else {
        this.isbn = this.route.queryParams['_value']['isbn'];
        this.bookObj = this.book.getBookDetails(this.isbn);
        this.bookObjEdit = this.bookObj;
        console.log("BOOK OBJ: ", this.bookObjEdit);
      }
    }

    onSubmit() {
      //add validation
      var result = this.book.doUpdateBook(this.bookObjEdit.isbn, this.bookObjEdit);
      if (result == true) {
        //return user to admin page
        this.router.navigate(['/management/books']); 

        this.toaster.success('Book successfully updated', 'Success!', {
          progressBar: true
        });
      } else {
        this.toaster.warning('Unable to update book details - please try again', 'Error!', {
           progressBar: true
         });
      }
    }
}