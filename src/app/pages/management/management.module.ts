import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
//import { RouterModule } from '@angular/router';

import { ManagementRoutingModule } from './management-routing.module';

import { AccountManagementComponent } from './account_management/account_management.component';
import { BookManagementComponent } from './book_management/book_management.component';
import { BookEditComponent } from './book_edit/book_edit.component';
import { AccountEditComponent } from './account_edit/account_edit.component';

import { ModalModule } from 'ngx-bootstrap/modal';

//import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
    // add part of this array any modules this module needs to operate
    imports: [
      CommonModule,
      FormsModule,
      ManagementRoutingModule,
      ModalModule,

      //RouterModule,
      //DashboardModule
    ],
    // add here any components that are part of this module
    declarations: [
      AccountManagementComponent,
      BookManagementComponent,
      BookEditComponent,
      AccountEditComponent
    ]
})
export class ManagementModule {}