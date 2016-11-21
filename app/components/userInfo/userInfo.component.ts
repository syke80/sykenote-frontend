import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserDetailsModel } from '../../models/userDetails.model';

@Component({
    moduleId: module.id,
    selector: 'user-info',
    templateUrl: 'userInfo.component.html'
})

export class UserInfoComponent {
    userInfo: UserDetailsModel;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.loggedIn$.subscribe(() => this.updateModel());
    }

    private updateModel(): void {
        this.authenticationService.getUserInfo()
            .then((userInfo: UserDetailsModel) => this.userInfo = userInfo);
    }

    ngOnInit(): void {
        this.updateModel();
    }
}