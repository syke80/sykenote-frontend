import { Component } from '@angular/core';

import { NoteService } from '../note.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

import { Note } from '../common/note';

@Component({
    moduleId: module.id,
    selector: 'notelistPage',
    templateUrl: 'notelistPage.component.html'
})

export class NotelistPageComponent {
    notes: Note[] = [];
    
    constructor(
        private noteService: NoteService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getNotes();
    }

    getNotes(): void {
        this.noteService.getNotes()
            .then(response => this.notes = response.notes)
            .catch(error => { this.handleHttpError.call(this, error) });
    }

    handleHttpError(error): void {
        if (error.status == 400 || error.status == 401) {
            this.authenticationService.deleteToken();
            this.router.navigate(['login']);
        }
    }
}
