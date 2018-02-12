import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { CsvComponent } from './csv/csv.component';
import { StrukturaComponent } from './struktura/struktura.component';
import { RwaComponent } from './rwa/rwa.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver } },
            { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
            { path: 'csv', component: CsvComponent },
            { path: 'struktura', component: StrukturaComponent },
            { path: 'rwa', component: RwaComponent }
        ]

    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
