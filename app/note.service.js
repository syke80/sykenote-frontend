"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var authentication_service_1 = require('./authentication.service');
var config_service_1 = require('./config.service');
require('rxjs/add/operator/toPromise');
var NoteService = (function () {
    function NoteService(authenticationService, http, configService) {
        this.authenticationService = authenticationService;
        this.http = http;
        this.configService = configService;
        this.endpointPostfix = '/notes';
    }
    NoteService.prototype.getServiceEndpoint = function () {
        if (!this.serviceEndpoint) {
            this.serviceEndpoint = this.configService.getOption('apiEndpoint') + this.endpointPostfix;
        }
        return this.serviceEndpoint;
    };
    NoteService.prototype.createHeaders = function () {
        return new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer:' + this.authenticationService.getToken()
        });
    };
    NoteService.prototype.getHeaders = function () {
        if (this.headers) {
            return this.headers;
        }
        this.headers = this.createHeaders();
        return this.headers;
    };
    NoteService.prototype.getNotes = function () {
        /*
                return this.http.get(this.noteUrl)
                    .toPromise()
                    .then(response => response.json() as Note[])
                    .catch(this.handleError);
        */
        return this.http.get(this.getServiceEndpoint(), { headers: this.getHeaders() })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    NoteService.prototype.getNote = function (id) {
        var currentNoteUrl = this.getServiceEndpoint() + '/' + id;
        return this.http.get(currentNoteUrl, { headers: this.getHeaders() })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
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
    NoteService.prototype.handleError = function (error) {
        console.log('handle http error @ note service', error);
        return Promise.reject(error.message || error);
    };
    NoteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, http_1.Http, config_service_1.ConfigService])
    ], NoteService);
    return NoteService;
}());
exports.NoteService = NoteService;
//# sourceMappingURL=note.service.js.map