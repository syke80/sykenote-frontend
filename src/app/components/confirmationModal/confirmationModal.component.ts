import { Component, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'confirmation-modal',
    templateUrl: 'confirmationModal.component.html'
})

export class ConfirmationModalComponent {
    @Input() message: string;
    @Input() title: string;
    @Input() okText: string = 'Ok';
    @Input() cancelText: string = 'Cancel';

    public okClicked$: EventEmitter<string>;

    constructor(public activeModal: NgbActiveModal) {
        this.okClicked$ = new EventEmitter();
    }

    onClickOkButton(): void {
        this.okClicked$.emit(this.okText);
        this.activeModal.close();
    }

    onClickCancelButton(): void {
        this.activeModal.dismiss();
    }

    onClickCloseButton(): void {
        this.activeModal.close();
    }
}
