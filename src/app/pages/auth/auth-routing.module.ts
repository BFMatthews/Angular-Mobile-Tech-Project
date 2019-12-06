import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { CanActivateGuard } from "../../guards/can-activate.guard";

const routes: Routes = [
  { path: 'auth', children: [
      { path: 'login', component: LoginComponent, canActivate: [CanActivateGuard], data: { guestRoute: true } },
      { path: 'register', component: RegisterComponent, canActivate: [CanActivateGuard], data: { guestRoute: true } },
      { path: 'reset', component: ResetComponent, canActivate: [CanActivateGuard], data: { guestRoute: true } },
      {
        path: '**', redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { } 