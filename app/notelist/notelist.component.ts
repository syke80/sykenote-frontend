import { Component } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { NoteService } from '../note.service';

import { Note } from '../common/note';

@Component({
    selector: 'notelist',
    templateUrl: 'app/notelist/notelist.component.html'
})

export class NotelistComponent {
    notelist : Note[];
    
    constructor(private noteService: NoteService) { }

    ngOnInit(): void {
        this.getNotes();
    }

    getNotes(): void {
        this.noteService.getNotes().then(
            function(result) {
                this.notelist = result;
            }.bind(this)
        )

    }
}
