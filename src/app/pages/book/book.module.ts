import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
//import { RouterModule } from '@angular/router';

import { BookRoutingModule } from './book-routing.module';

import { BookListComponent } from './book_list/book_list.component';
import { BookDetailsComponent } from './book_details/book_details.component';
import { BookSearchComponent } from './book_search/book_search.component';
import { BookFilterComponent } from './book_filter/book_filter.component';

//import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
    // add part of this array any modules this module needs to operate
    imports: [
      CommonModule,
      FormsModule,
      BookRoutingModule,

      //RouterModule,
      //DashboardModule
    ],
    // add here any components that are part of this module
    declarations: [
      BookListComponent,
      BookDetailsComponent,
      BookSearchComponent,
      BookFilterComponent
    ]
})
export class BookModule {}