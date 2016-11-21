import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LoginResponseModel } from '../models/loginResponse.model';
import { LoginRequestModel } from '../models/loginRequest.model';
import { RegistrationRequestModel } from '../models/registrationRequest.model';
import { UserDetailsModel } from '../models/userDetails.model';

@Injectable()

export class AuthenticationService {
    public loggedIn$: EventEmitter<string>;
    private authenticationUrl: string = 'http://api.sykenote.dev/api/login';
    private registrationUrl: string = 'http://api.sykenote.dev/api/user';

    token: string;

    constructor(private http: Http) {
        this.loggedIn$ = new EventEmitter();
    }

    private getTokenFromServer(email: string, password: string): Promise<LoginResponseModel> {
        let parameters: LoginRequestModel = {
            email: email,
            password: password
        };

        return this.http.post(this.authenticationUrl, parameters)
            .toPromise()
            .then( function(response) {
                return response.json();
            })
            .catch(this.handleHttpError);
    }

    private getUserInfoFromApi(): Promise<UserDetailsModel> {
        let options: RequestOptions = new RequestOptions({ headers: this.getHeaders() });

        return this.http.get(this.authenticationUrl, options)
            .toPromise()
            .then( (response: Response) => response.json() )
            .catch(this.handleHttpError);
    }

    private deleteToken(): void {
        delete this.token;
        localStorage.removeItem('token');
    }

    getHeaders(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer:' + this.getToken()
        });
    }

    getToken(): string {
        return this.token || localStorage.getItem('token');
    }

    logout(): void {
        this.deleteToken();
    }

    getUserInfo(): Promise<UserDetailsModel> {
        return this.getUserInfoFromApi();
    }

    login(email: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getTokenFromServer(email, password).then((response) => {
                if (response) {
                    this.token = response.token;
                    localStorage.setItem('token', response.token);
                    this.loggedIn$.emit(response.token);
                    resolve(true);
                } else {
                    // TODO: redirect to main page
                    reject(false);
                }
            });
        });
    }

    register(email: string, password: string): Promise<boolean> {
        let parameters: RegistrationRequestModel = {
            email: email,
            password: password
        };

        return this.http.post(this.registrationUrl, parameters)
            .toPromise()
            .then( function(response) {
                return response.json();
            })
            .catch(this.handleHttpError);
    }

    handleHttpError(error): boolean {
        console.log('handle http error @ authentication service', error);
        if (error.status === 422) {
            return false;
        }
        console.log('Some error occured while communicating with endpoint.', error);
    }

}