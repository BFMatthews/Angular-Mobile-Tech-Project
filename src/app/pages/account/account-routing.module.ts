import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuard } from "../../guards/can-activate.guard";
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { MyBooksComponent } from './my-books/my-books.component';

const routes: Routes = [
  { path: 'account', children: [
      { path: 'profile', component: ProfileComponent, canActivate: [CanActivateGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [CanActivateGuard] },
      { path: 'books', component: MyBooksComponent, canActivate: [CanActivateGuard] },
      {
        path: '**', redirectTo: 'profile'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AccountRoutingModule { } 