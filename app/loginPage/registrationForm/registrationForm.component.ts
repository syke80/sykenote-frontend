import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { RegistrationModel } from '../../registration.model';
import { AuthenticationService } from '../../authentication.service';

class RegistrationFormModel extends RegistrationModel {
    confirmPassword: String;
    test: FormControl;
}

@Component({
    moduleId: module.id,
    selector: 'registrationForm',
    templateUrl: 'registrationForm.component.html'
})

export class RegistrationFormComponent {
    redirectPage: string;

    model: RegistrationFormModel = {
        email: '1',
        password: '22',
        confirmPassword: '333',
        test: new FormControl('', Validators.required)
    }

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    private redirect() {
        if (!this.redirectPage) {
            console.log('redirecting');
            this.router.navigateByUrl('');
        }
    }

    doLogin() {
        this.authenticationService.login(this.model.email, this.model.password).then(() => {
            this.redirect();
        }).catch( function(error) {
            this.redirect();
            console.log('dologin: not resolved', error);
            // TODO: error handling in a popup: Error on login
            // alert('Invalid email address or password.');
        });
    }

    onSubmitRegistrationForm(event) {
        this.authenticationService.register(this.model.email, this.model.password).then(() => {
            console.log('successful registration');
            // this.doLogin();
        }).catch( function(error) {
            console.log('doregister: not resolved', error);
            // TODO: error handling in a popup
            // alert('Invalid email address or password.');
        });
        event.preventDefault();
    }
}
