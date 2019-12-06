import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
//import { RouterModule } from '@angular/router';

import { GeneralRoutingModule } from './general-routing.module';

import { AboutComponent } from './about/about.component';
import { BooksComponent } from './books/books.component';

//import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
    // add part of this array any modules this module needs to operate
    imports: [
      CommonModule,
      FormsModule,
      GeneralRoutingModule,

      //RouterModule,
      //DashboardModule
    ],
    // add here any components that are part of this module
    declarations: [
      AboutComponent,
      BooksComponent
    ]
})
export class GeneralModule {}