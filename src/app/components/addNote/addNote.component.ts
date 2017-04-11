import { Component } from '@angular/core';
import { AddNoteRequestModel } from '../../models/addNoteRequest.model';
import { AddNoteResponseModel } from '../../models/addNoteResponse.model';
import { NoteService } from '../../services/note.service';

@Component({
    moduleId: module.id,
    selector: 'app-add-note',
    templateUrl: 'addNote.component.html'
})

export class AddNoteComponent {
    model: AddNoteRequestModel = {
        title: ''
    };

    constructor(private noteService: NoteService) { }

    onSubmitAddNoteForm(event: Event): void {
        event.preventDefault();
        this.noteService.create(this.model)
            .then((response: AddNoteResponseModel) => this.onCreateSuccess(response));
    }

    onCreateSuccess(response: AddNoteResponseModel): void {
        alert(response.note.title);
        // send event: select note to edit
    }
}
