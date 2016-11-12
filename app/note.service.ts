import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { ConfigService } from './config.service';

import 'rxjs/add/operator/toPromise';

import { Note }      from './common/note';

@Injectable()

export class NoteService {
    private serviceEndpoint;
    private headers: Headers;
    private endpointPostfix: String = '/notes'

    constructor(private authenticationService: AuthenticationService, private http: Http, private configService: ConfigService ) { }

    private getServiceEndpoint(): string {
        if (!this.serviceEndpoint) {
            this.serviceEndpoint = this.configService.getOption('apiEndpoint') + this.endpointPostfix;
        }
        return this.serviceEndpoint;
    }

    private createHeaders() {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer:' + this.authenticationService.getToken()
        });
    }

    private getHeaders() {
        if (this.headers) {
            return this.headers;
        }

        this.headers = this.createHeaders();

        return this.headers;
    }

    getNotes(): Promise<Note[]> {
/*
        return this.http.get(this.noteUrl)
            .toPromise()
            .then(response => response.json() as Note[])
            .catch(this.handleError);
*/
        return this.http.get(this.getServiceEndpoint(), { headers: this.getHeaders() })
            .toPromise()
            .then( function(response) {
                return response.json();
            })
            .catch(this.handleError);
    }

    getNote(id): Promise<Note> {
        var currentNoteUrl = this.getServiceEndpoint() + '/' + id;
        return this.http.get(currentNoteUrl, { headers: this.getHeaders() })
            .toPromise()
            .then( function(response) {
                return response.json();
            })
            .catch(this.handleError);
    }
/*
    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers} )
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: String): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), { headers: this.headers} )
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(hero: Hero): Promise<Hero> {
        return this.http
            .delete(heroesUrl, JSON.stringify(hero), { headers: this.headers} )
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
*/
    private handleError(error: any): Promise<any> {
        console.log('handle http error @ note service', error);
        return Promise.reject(error.message || error);
    }
/*
    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000))
            .then(() => this.getHeroes());
    }

    getHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }
*/
}