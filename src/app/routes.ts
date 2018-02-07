import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { CsvComponent } from './csv/csv.component';
import { StrukturaComponent } from './struktura/struktura.component';
import { RwaComponent } from './rwa/rwa.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'members', component: MemberListComponent },
    { path: 'csv', component: CsvComponent },
    { path: 'struktura', component: StrukturaComponent },
    { path: 'rwa', component: RwaComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];