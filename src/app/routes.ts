import { JednostkaListaComponent } from './struktura/jednostka-lista/jednostka-lista.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
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
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-chages.guard';
import { JednostkiResolver } from './_resolvers/jednostki.resolver';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver } },
            { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
            { path: 'member/edit', component: MemberEditComponent,
                resolve: { user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] },
            { path: 'csv', component: CsvComponent },
            { path: 'struktura', component: StrukturaComponent },
            { path: 'rwa', component: RwaComponent }
        ]

    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
