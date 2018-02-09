import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';

import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { StrukturaComponent } from './struktura/struktura.component';
import { CsvComponent } from './csv/csv.component';
import { RwaComponent } from './rwa/rwa.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    TimeAgoPipe,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    MemberListComponent,
    StrukturaComponent,
    CsvComponent,
    RwaComponent,
    MemberDetailComponent,
    MemberCardComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AuthModule,
    TabsModule.forRoot()
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
