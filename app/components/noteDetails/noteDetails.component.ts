import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NoteModel } from '../../models/note.model';
import { GetNoteResponseModel } from '../../models/getNoteResponse.model';
import { NoteService } from '../../services/note.service';
import { AuthenticationService } from '../../services/authentication.service';

@Pipe({name: 'textToHtml'})
export class TextToHtml implements PipeTransform {
    transform(content: string): string {
        let updatedContent: string = content.replace(/(?:\r\n|\r|\n)/g, '<br />');

        return updatedContent;
    }
}

@Component({
    moduleId: module.id,
    selector: 'note-details',
    templateUrl: 'noteDetails.component.html'
})

export class NoteDetailsComponent {
    @Input() id: number;
    note: NoteModel;
    actualContent: string;
    isDirty: boolean;

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
                    this.actualContent = this.note.content;
                    this.isDirty = false;
                })
                .catch(error => {
                    this.handleHttpError.call(this, error);
                });
        }
    }

    private updateModel(): void {
        this.note.content = this.actualContent;
    }

    getContentHtml(): string {
        if (this.note) {
            return this.note.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
        else {
            return '';
        }
    }

    onSubmitNoteDetailsForm(): void {
        this.updateModel();
        this.noteService.update(this.note)
            .then( () => {
                this.isDirty = false;
            } ) // TODO: show popup with msg
            .catch( error => {
                this.handleHttpError.call(this, error);
            });
    }

    onKeyPressedInContent($event: KeyboardEvent): void {
        let targetElement: HTMLElement;

        targetElement = <HTMLElement> $event.target;
        this.actualContent = targetElement.innerText;
        this.isDirty = true;
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
