import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotePageComponent } from './components/notePage/notePage.component';
import { NotelistPageComponent } from './components/notelistPage/notelistPage.component';
import { HelpPageComponent } from './components/helpPage/helpPage.component';
import { LoginPageComponent } from './components/loginPage/loginPage.component';

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
