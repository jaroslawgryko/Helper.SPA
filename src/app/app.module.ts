import { JednostkaListaComponent } from './struktura/jednostka-lista/jednostka-lista.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-chages.guard';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { BsDropdownModule, TabsModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { Ng2TableModule } from 'ng2-table';
import { TreeModule } from 'ng2-tree';
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
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { JednostkiResolver } from './_resolvers/jednostki.resolver';
import { CsvContentComponent } from './csv/csv-content/csv-content.component';
import { JednostkaTreeComponent } from './struktura/jednostka-tree/jednostka-tree.component';



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
    RwaComponent,
    MemberDetailComponent,
    MemberCardComponent,
    MemberEditComponent,
    JednostkaListaComponent,
    JednostkaTreeComponent,
    CsvComponent,
    CsvContentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AuthModule,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    Ng2TableModule, TreeModule
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberListResolver,
    MemberDetailResolver,
    MemberEditResolver,
    PreventUnsavedChanges,
    JednostkiResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
