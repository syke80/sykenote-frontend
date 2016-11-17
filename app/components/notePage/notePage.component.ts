import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

import { NoteService } from '../../services/note.service';
import { AuthenticationService } from '../../services/authentication.service';

import { NoteModel } from '../../models/note.model';

@Component({
    moduleId: module.id,
    selector: 'notePage',
    templateUrl: 'notePage.component.html'
})

export class NotePageComponent {
    @Input() note: NoteModel = {
        title: '',
        content: '',
        id: 0
    };

    constructor(
        private noteService: NoteService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router
    ) {}
    
    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.noteService.getNote(id)
              .then(response => this.note = response.note)
              .catch(error => { this.handleHttpError.call(this, error) });
        });
    }

    handleHttpError(error): void {
        if (error.status == 400 || error.status == 401) {
            this.authenticationService.deleteToken();
            this.router.navigate(['login']);
        }
    }
}
