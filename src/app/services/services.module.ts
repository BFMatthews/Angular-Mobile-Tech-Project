import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BookService } from './book/book.service';

const SERVICES = [
  AuthService,
  BookService
];

@NgModule({
  imports: [ ],
  providers: [ ...SERVICES ],
  exports: [ ]
})

export class ServicesModule {

}