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
require('rxjs/add/operator/toPromise');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.authenticationUrl = 'http://api.sykenote.dev/api/login';
    }
    AuthenticationService.prototype.getTokenFromServer = function (email, password) {
        var parameters = {
            email: email,
            password: password
        };
        return this.http.post(this.authenticationUrl, parameters)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleHttpError);
    };
    AuthenticationService.prototype.getToken = function () {
        return this.token || localStorage.getItem('token');
    };
    AuthenticationService.prototype.deleteToken = function () {
        delete this.token;
        localStorage.removeItem('token');
    };
    AuthenticationService.prototype.login = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getTokenFromServer(email, password).then(function (response) {
                if (response) {
                    console.log('response', _this, response);
                    _this.token = response.token;
                    localStorage.setItem('token', response.token);
                    console.log('resolve sent');
                    resolve(true);
                }
                else {
                    console.log('reject sent');
                    reject(false);
                }
            });
        });
    };
    AuthenticationService.prototype.handleHttpError = function (error) {
        console.log('handle http error @ authentication service', error);
        if (error.status == 401) {
            return false;
        }
        console.log('Some error occured while communicating with endpoint.', error);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map