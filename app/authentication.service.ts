import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LoginResponse } from './loginresponse';

@Injectable()

export class AuthenticationService {
    private authenticationUrl = 'http://api.sykenote.dev/api/login';

    token: string;

    constructor(private http: Http) { }

    private getTokenFromServer(email: string, password: string): Promise<LoginResponse> {
        var parameters = {
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
                    console.log('response', this, response);
                    this.token = response.token;
                    localStorage.setItem('token', response.token);
                    console.log('resolve sent');
                    resolve(true);
                } else {
                    console.log('reject sent');
                    reject(false);
                }
            });
        });
    }

    handleHttpError(error): boolean {
        console.log('handle http error @ authentication service', error);
        if (error.status == 401) {
            return false;
        }
        console.log('Some error occured while communicating with endpoint.', error);
    }

}