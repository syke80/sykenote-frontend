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
var router_1 = require('@angular/router');
require('rxjs/add/operator/toPromise');
var authentication_service_1 = require('./authentication.service');
var LoginComponent = (function () {
    function LoginComponent(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.model = {
            email: '',
            password: ''
        };
    }
    LoginComponent.prototype.redirect = function () {
        if (!this.redirectPage) {
            console.log('redirecting');
            this.router.navigateByUrl('');
        }
    };
    LoginComponent.prototype.doLogin = function (event) {
        var _this = this;
        console.log("do login");
        this.authenticationService.login(this.model.email, this.model.password).then(function () {
            _this.redirect();
        }).catch(function (error) {
            console.log('dologin: not resolved', error);
            // alert('Invalid email address or password.');
        });
        event.preventDefault();
    };
    LoginComponent.prototype.myButton = function (event) {
        console.log('mybutton clicked', event);
        console.log('token', this.authenticationService.getToken());
    };
    LoginComponent.prototype.ngOnInit = function () {
        if (this.authenticationService.getToken()) {
            console.log('Already logged in.');
            this.redirect();
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.component.html'
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map