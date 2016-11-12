"use strict";
var router_1 = require('@angular/router');
var note_component_1 = require('./note.component');
var help_component_1 = require('./help.component');
var login_component_1 = require('./login.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/help',
        pathMatch: 'full'
    },
    {
        path: 'help',
        component: help_component_1.HelpComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'note/:id',
        component: note_component_1.NoteComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map