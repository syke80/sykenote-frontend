import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

import { NoteService } from './note.service';
import { AuthenticationService } from './authentication.service';

import { Note } from './common/note';

@Component({
    moduleId: module.id,
    selector: 'note',
    templateUrl: 'note.component.html'
})

export class NoteComponent {
    @Input() note: Note = {
        title: '',
        content: '',
        id: 0
    };

    constructor(
        private noteService: NoteService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}
    
    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.noteService.getNote(id)
              .then(note => this.note = note)
              .catch(error => { this.handleHttpError.call(this, error) });
        });
    }

    handleHttpError(error): void {
        console.log('handle http error @ note component', error);
        if (error.status == 400 || error.status == 401) {
            this.authenticationService.deleteToken();
            this.router.navigate(['login']);
        }
    }
}
