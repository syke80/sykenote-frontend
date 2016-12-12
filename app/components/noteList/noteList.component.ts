import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NoteModel } from '../../models/note.model';
import { NoteListResponseModel } from '../../models/noteListResponse.model';
import { NoteService } from '../../services/note.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmationModal/confirmationModal.component';

const TOKEN_EXPIRED: string = 'token_expired';
const TOKEN_INVALID: string = 'token_invalid';
const TOKEN_MISSING: string = 'token_not_provided';
const DELETE_MODAL_TITLE: string = 'Delete note';
const TITLE_KEY: string = '{title}';
const DELETE_CONFIRMATION_MESSAGE: string = 'Are you sure to delete "' + TITLE_KEY + '"?';

@Component({
    moduleId: module.id,
    selector: 'note-list',
    templateUrl: 'noteList.component.html'
})

export class NoteListComponent {
    @Input() selectedNoteId: number;
    notes: NoteModel[] = [];

    constructor(
        private noteService: NoteService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private modalService: NgbModal
    ) {
        this.noteService.itemCreated$.subscribe(() => this.onItemCreated());
    }

    ngOnInit(): void {
        this.getNotes();
    }

    onItemCreated(): void {
        this.getNotes();
    }

    private showDeleteModal(noteTitle: string): NgbModalRef {
        const modalRef: NgbModalRef = this.modalService.open(ConfirmationModalComponent);

        modalRef.componentInstance.title = DELETE_MODAL_TITLE;
        modalRef.componentInstance.message = DELETE_CONFIRMATION_MESSAGE.replace(TITLE_KEY, noteTitle);
        modalRef.componentInstance.okText = 'Yes';
        modalRef.componentInstance.cancelText = 'No';

        return modalRef;
    }

    private deleteNote(noteId: number): void {
        this.noteService.delete(noteId)
            .then(() => {
                if (noteId === this.selectedNoteId) {
                    this.redirectToNote(0);
                }
                this.getNotes();
            })
            .catch((error: any) => this.handleError.call(this, error) );
    }

    onClickDeleteButton($event: MouseEvent, noteId: number, noteTitle: string): void {
        let modalRef: NgbModalRef;
        $event.stopPropagation();
        modalRef = this.showDeleteModal(noteTitle);
        modalRef.componentInstance.okClicked$.subscribe(() => this.deleteNote(noteId));
    }

    private redirectToNote(noteId: number): void {
        if (noteId === 0) {
            this.router.navigate(['note']);
        }
        else {
            this.router.navigate(['note', noteId]);
        }
    }

    onClickItem(noteId: number): void {
        this.redirectToNote(noteId);
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
