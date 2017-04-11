import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import 'rxjs/add/operator/toPromise';

import { RegistrationRequestModel } from '../../../models/registrationRequest.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { AlertModalComponent } from '../../alertModal/alertModal.component';

class RegistrationFormModel extends RegistrationRequestModel {
    confirmPassword: String;
    test: FormControl;
}

const ERROR_MODAL_TITLE: string = 'Registration error';
const ALREADY_REGISTERED_ERROR_MESSAGE: string = 'The email address is already registered.';

@Component({
    moduleId: module.id,
    selector: 'app-registration-form',
    templateUrl: 'registrationForm.component.html'
})

export class RegistrationFormComponent {
    redirectPage: string;

    model: RegistrationFormModel = {
        email: '1',
        password: '22',
        confirmPassword: '333',
        test: new FormControl('', Validators.required)
    };

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private modalService: NgbModal
    ) { }

    private redirect(): void {
        if (!this.redirectPage) {
            console.log('redirecting');
            this.router.navigateByUrl('');
        }
    }

    doLogin(): void {
        this.authenticationService.login(this.model.email, this.model.password).then(() => {
            this.redirect();
        }).catch( function(error) {
            console.log('dologin: not resolved', error);
            this.redirect();
            // TODO: error handling in a popup: Error on login
            // alert('Invalid email address or password.');
        });
    }

    onSubmitRegistrationForm(event: Event): void {
        this.authenticationService.register(this.model.email, this.model.password).then(() => {
            console.log('successful registration');
            this.doLogin();
        }).catch( function(error) {
            const modalRef: NgbModalRef = this.modalService.open(AlertModalComponent);
            modalRef.componentInstance.title = ERROR_MODAL_TITLE;
            modalRef.componentInstance.message = ALREADY_REGISTERED_ERROR_MESSAGE;

            console.log('doregister: not resolved', error);
            // TODO: error handling in a popup
            // alert('Invalid email address or password.');
        });
        event.preventDefault();
    }
}
