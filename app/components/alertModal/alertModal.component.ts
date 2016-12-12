import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'alert-modal',
    templateUrl: 'alertModal.component.html'
})

export class AlertModalComponent {
    @Input() message: string;
    @Input() title: string;

    constructor(public activeModal: NgbActiveModal) {}

    close(): void {
        this.activeModal.close();
    }

    dismiss(): void {
        this.activeModal.dismiss();
    }
}
