import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { LoginModel } from './loginmodel';
import { AuthenticationService } from './authentication.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    model: LoginModel = {
        email: '',
        password: ''
    }

    redirectPage: string;

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    private redirect() {
        if (!this.redirectPage) {
            console.log('redirecting');
            this.router.navigateByUrl('');
        }
    }

    doLogin(event) {
        console.log("do login");
        this.authenticationService.login(this.model.email, this.model.password).then(() => {
            this.redirect();
        }).catch( function(error) {
            console.log('dologin: not resolved', error);
           // alert('Invalid email address or password.');
        });
        event.preventDefault();
    }

    myButton(event) {
        console.log('mybutton clicked', event);
        console.log('token', this.authenticationService.getToken());
    }

    ngOnInit(): void {
        if (this.authenticationService.getToken()) {
            console.log('Already logged in.');
            this.redirect();
        }
    }
}
