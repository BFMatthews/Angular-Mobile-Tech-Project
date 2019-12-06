import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountManagementComponent } from './account_management/account_management.component';
import { BookManagementComponent } from './book_management/book_management.component';
import { BookEditComponent } from './book_edit/book_edit.component';
import { AccountEditComponent } from './account_edit/account_edit.component';

import { CanActivateGuard } from "../../guards/can-activate.guard";

const routes: Routes = [
  { path: 'management', children: [
      { path: 'account', component: AccountManagementComponent },
      // { path: 'books', component: BookManagementComponent, canActivate: [CanActivateGuard], data: { roles: ['librarian', 'admin'] } },
      { path: 'books', component: BookManagementComponent },
      { path: 'book_edit', component: BookEditComponent },
      { path: 'account_edit', component: AccountEditComponent },
      {
        path: '**', redirectTo: 'books'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ManagementRoutingModule { } 