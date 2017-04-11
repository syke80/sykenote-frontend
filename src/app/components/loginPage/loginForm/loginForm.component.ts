import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import 'rxjs/add/operator/toPromise';

import { LoginRequestModel } from '../../../models/loginRequest.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { AlertModalComponent } from '../../alertModal/alertModal.component';

const ERROR_MODAL_TITLE: string = 'Login error';
const INVALID_CREDENTIALS_ERROR_MESSAGE: string = 'Invalid credentials';

@Component({
    moduleId: module.id,
    selector: 'login-form',
    templateUrl: 'loginForm.component.html'
})

export class LoginFormComponent {
    redirectPage: string;

    model: LoginRequestModel = {
        email: '',
        password: ''
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
        }).catch( error => {
            const modalRef: NgbModalRef = this.modalService.open(AlertModalComponent);
            modalRef.componentInstance.title = ERROR_MODAL_TITLE;
            modalRef.componentInstance.message = INVALID_CREDENTIALS_ERROR_MESSAGE;

            console.log('dologin: not resolved', error);
            // TODO: error handling in a popup
            // alert('Invalid email address or password.');
        });
    }

    onSubmitLoginForm(event: Event): void {
        this.doLogin();
        event.preventDefault();
    }

    ngOnInit(): void {
        if (this.authenticationService.getToken()) {
            console.log('Already logged in.');
            this.redirect();
        }
    }
}
