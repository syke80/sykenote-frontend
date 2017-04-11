import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'note-page',
    templateUrl: 'notePage.component.html'
})

export class NotePageComponent {
    selectedNoteId: number = 0;

    constructor(
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            let id: number = +params['id'];
            this.selectedNoteId = id;
        });
    }
}
