import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { BookService } from '../../../services/book/book.service';
// import { User } from './models/user.class';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'my-app-pages-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css' ],
})
export class DashboardComponent {
    user = null;
    userLoans = null;
    randomBook = [];

    bookNumbers = {
      'total':0,
      'available':0,
      'loaned':0,
      'pendingReturn':0,
      'pendingLoan':0,
      'overdue':0
    };

    constructor(private auth:AuthService, private router: Router, private book:BookService,private toaster:ToastrService) {
        this.user = this.auth.doGetUserObj(this.auth.theUser.email);
        this.userLoans = this.auth.doGetUserRentals(this.user.email);
        var allBooks = this.book.getBooks();

        this.bookNumbers.available = this.book.doGetAvailableBooks();
        this.bookNumbers.loaned = this.userLoans.length;
        this.bookNumbers.total = allBooks.length;
        this.bookNumbers.pendingLoan = this.book.doGetUserPendingLoan(this.user.email)
        this.bookNumbers.pendingReturn = this.book.doGetUserPendingReturn(this.user.email)

        var randomNumber = Math.floor(Math.random() * allBooks.length) + 1;
        this.randomBook.push(allBooks[randomNumber]);
    }

    onLoanedClick() {
      this.router.navigate(['/account/books'], { queryParams: { email: this.user.email}, queryParamsHandling: 'merge' });
    }

    viewMoreClicked(bookISBN) {
      this.router.navigate(['/book/details'], { queryParams: { isbn: bookISBN}, queryParamsHandling: 'merge' });
    }
}