import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NoteModel } from '../../models/note.model';
import { NoteListResponseModel } from '../../models/noteListResponse.model';
import { NoteService } from '../../services/note.service';
import { AuthenticationService } from '../../services/authentication.service';

const TOKEN_EXPIRED: string = 'token_expired';
const TOKEN_INVALID: string = 'token_invalid';
const TOKEN_MISSING: string = 'token_not_provided';

@Component({
    moduleId: module.id,
    selector: 'note-list',
    templateUrl: 'noteList.component.html'
})

export class NoteListComponent {
    notes: NoteModel[] = [];

    constructor(
        private noteService: NoteService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.noteService.itemCreated$.subscribe(() => this.onItemCreated());
    }

    ngOnInit(): void {
        this.getNotes();
    }

    onItemCreated(): void {
        this.getNotes();
    }

    // TODO: any must be apiresponse
    getNotes(): void {
        this.noteService.getNotes()
            .then((response: NoteListResponseModel) => this.notes = response.notes)
            .catch((error: any) => { this.handleError.call(this, error); });
    }

    handleError(error: string): void {
        if (error === TOKEN_EXPIRED || error === TOKEN_INVALID || error === TOKEN_MISSING) {
            this.authenticationService.logout();
            this.router.navigate(['login']);
            return;
        }
        console.error('Unhandled error: ' + error);
    }
}
