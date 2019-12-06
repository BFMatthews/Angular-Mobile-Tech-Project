import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookDetailsComponent } from './book_details/book_details.component';
import { BookListComponent } from './book_list/book_list.component';
import { BookSearchComponent } from './book_search/book_search.component'; 
import { BookFilterComponent } from './book_filter/book_filter.component'; 

const routes: Routes = [
  { path: 'book', children: [
      { path: 'details', component: BookDetailsComponent, },
      { path: 'list', component: BookListComponent, },
      { path: 'search', component: BookSearchComponent, },
      { path: 'filter', component: BookFilterComponent, },
      {
        path: '**', redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BookRoutingModule { } 