import { Component } from '@angular/core';
import { AddNoteRequestModel } from '../common/addNoteRequest.model';
import { NoteService } from '../note.service';

@Component({
    moduleId: module.id,
    selector: 'add-note',
    templateUrl: 'addNote.component.html'
})

export class AddNoteComponent {
    model: AddNoteRequestModel = {
        title: ''
    }

    constructor(private noteService: NoteService) { }

    onSubmitAddNoteForm(event): void {
        event.preventDefault();
//        this.noteService.create(this.model);
    }
}
