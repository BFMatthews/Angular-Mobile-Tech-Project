import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
//import { RouterModule } from '@angular/router';

import { AccountRoutingModule } from './account-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { MyBooksComponent } from './my-books/my-books.component';

import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatar';
//import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
    // add part of this array any modules this module needs to operate
    imports: [
      CommonModule,
      FormsModule,
      AccountRoutingModule,
      HttpClientModule,
      AvatarModule,
      //RouterModule,
      //DashboardModule
    ],
    // add here any components that are part of this module
    declarations: [
      ProfileComponent,
      SettingsComponent,
      MyBooksComponent
    ]
})
export class AccountModule {}