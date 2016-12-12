import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NoteModel } from '../../models/note.model';
import { GetNoteResponseModel } from '../../models/getNoteResponse.model';
import { NoteService } from '../../services/note.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'note-details',
    templateUrl: 'noteDetails.component.html'
})

export class NoteDetailsComponent {
    @Input() id: number;
    note: NoteModel;

    constructor(
        private noteService: NoteService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    private fetchNote(): void {
        if (!!this.id) {
            this.noteService.getNote(this.id)
                .then((response: GetNoteResponseModel) => {
                    this.note = response.note;
                })
                .catch(error => {
                    this.handleHttpError.call(this, error);
                });
        }
    }

    onSubmitNoteDetailsForm(): void {
        this.noteService.update(this.note)
            .then( () => true ) // TODO: show popup with msg
            .catch( error => {
                this.handleHttpError.call(this, error);
            });
    }

    onTextContentChange(): void {
        alert('text content has been changed');
    }

    ngOnChanges(): void {
        this.fetchNote();
    }

    handleHttpError(error): void {
        if (error.status === 400 || error.status === 401) {
            this.authenticationService.logout();
            this.router.navigate(['login']);
        }
    }
}
