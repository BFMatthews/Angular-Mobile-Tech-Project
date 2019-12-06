// Angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// third party modules, if any
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'ngx-avatar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';

// the global routing config
import { AppRoutingModule } from './app-routing.module';

// my own modules
import { ServicesModule } from './services/services.module';
import { AuthModule } from './pages/auth/auth.module';
import { GeneralModule } from './pages/general/general.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { ToDoModule } from './pages/to-do/to-do.module';
import { AccountModule } from './pages/account/account.module';
import { BookModule } from './pages/book/book.module';
import { ManagementModule } from './pages/management/management.module';

// the app core layout
import { LayoutComponent } from './layout/layout.component';

@NgModule({
    imports: [
        // Angular modules
        BrowserModule,

        // third party modules, if any
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
        BrowserAnimationsModule,
        HttpClientModule,
        AvatarModule,

        // my own modules
        ServicesModule,
        GeneralModule,
        ManagementModule,

        AuthModule,
        DashboardModule,
        ToDoModule,
        AccountModule,
        BookModule,

        // the app routing must be loaded last to ensure the catch-all (**) route is only activated as a last resort - the order in which routing is set up matters
        AppRoutingModule,
    ],
    declarations: [ LayoutComponent ],
    bootstrap: [ LayoutComponent ],
})
export class AppModule {}