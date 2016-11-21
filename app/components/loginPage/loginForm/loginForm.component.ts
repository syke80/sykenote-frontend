import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { LoginRequestModel } from '../../../models/loginRequest.model';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'loginForm',
    templateUrl: 'loginForm.component.html'
})

export class LoginFormComponent {
    redirectPage: string;

    model: LoginRequestModel = {
        email: '',
        password: ''
    };

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

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
