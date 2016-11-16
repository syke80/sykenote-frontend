import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotePageComponent }   from './notePage/notePage.component';
import { NotelistPageComponent }   from './notelistPage/notelistPage.component';
import { HelpPageComponent }   from './helpPage/helpPage.component';
import { LoginPageComponent } from './loginPage/loginPage.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/help',
        pathMatch: 'full'
    },
    {
        path: 'help',
        component: HelpPageComponent
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'note/:id',
        component: NotePageComponent
    },
    {
        path: 'notelist',
        component: NotelistPageComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
