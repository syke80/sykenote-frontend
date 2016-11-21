import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotePageComponent } from './components/notePage/notePage.component';
import { HelpPageComponent } from './components/helpPage/helpPage.component';
import { LoginPageComponent } from './components/loginPage/loginPage.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/note',
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
        path: 'note',
        component: NotePageComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
