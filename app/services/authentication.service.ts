import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LoginResponseModel } from '../models/loginResponse.model';
import { LoginRequestModel } from '../models/loginRequest.model';
import { RegistrationRequestModel } from '../models/registrationRequest.model';

@Injectable()

export class AuthenticationService {
    private authenticationUrl = 'http://api.sykenote.dev/api/login';
    private registrationUrl = 'http://api.sykenote.dev/api/user';

    token: string;

    constructor(private http: Http) { }

    private getTokenFromServer(email: string, password: string): Promise<LoginResponseModel> {
        var parameters:LoginRequestModel = {
            email: email,
            password: password
        }
        return this.http.post(this.authenticationUrl, parameters)
            .toPromise()
            .then( function(response) {
                return response.json();
            })
            .catch(this.handleHttpError);
    }

    getToken(): string {
        return this.token || localStorage.getItem('token');
    }

    deleteToken(): void {
        delete this.token;
        localStorage.removeItem('token');
    }

    login(email: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getTokenFromServer(email, password).then((response) => {
                if (response) {
                    this.token = response.token;
                    localStorage.setItem('token', response.token);
                    resolve(true);
                } else {
                    // TODO: redirect to main page
                    reject(false);
                }
            });
        });
    }

    register(email: string, password: string): Promise<boolean> {
        var parameters: RegistrationRequestModel = {
            email: email,
            password: password
        }
        return this.http.post(this.registrationUrl, parameters)
            .toPromise()
            .then( function(response) {
                return response.json();
            })
            .catch(this.handleHttpError);
    }

    handleHttpError(error): boolean {
        console.log('handle http error @ authentication service', error);
        if (error.status == 422) {
            return false;
        }
        console.log('Some error occured while communicating with endpoint.', error);
    }

}