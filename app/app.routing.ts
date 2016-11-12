import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteComponent }   from './note.component';
import { HelpComponent }   from './help.component';
import { LoginComponent } from './login.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/help',
        pathMatch: 'full'
    },
    {
        path: 'help',
        component: HelpComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'note/:id',
        component: NoteComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
