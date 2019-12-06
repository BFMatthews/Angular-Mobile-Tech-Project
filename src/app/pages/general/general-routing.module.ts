import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  { path: 'general', children: [
      { path: 'about', component: AboutComponent },
      { path: 'books', component: BooksComponent },
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
export class GeneralRoutingModule { } 