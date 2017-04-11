import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    moduleId: module.id,
    templateUrl: 'loginPage.component.html'
})

export class LoginPageComponent implements OnInit {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    redirectPage: string;

    private redirect() {
        if (!this.redirectPage) {
            console.log('redirecting');
            this.router.navigateByUrl('');
        }
    }

    ngOnInit(): void {
        if (this.authenticationService.getToken()) {
            console.log('Already logged in.');
            this.redirect();
        }
    }
}
