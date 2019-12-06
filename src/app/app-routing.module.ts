import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/general/books', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: '/dashboard' },
  { path: '**', redirectTo: '/auth/login' } // any other request
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { } 