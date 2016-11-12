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
var common_1 = require('@angular/common');
var note_service_1 = require('./note.service');
var authentication_service_1 = require('./authentication.service');
var note_1 = require('./common/note');
var NoteComponent = (function () {
    function NoteComponent(noteService, authenticationService, route, router, location) {
        this.noteService = noteService;
        this.authenticationService = authenticationService;
        this.route = route;
        this.router = router;
        this.location = location;
        this.note = {
            title: '',
            content: '',
            id: 0
        };
    }
    NoteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.noteService.getNote(id)
                .then(function (note) { return _this.note = note; })
                .catch(function (error) { _this.handleHttpError.call(_this, error); });
        });
    };
    NoteComponent.prototype.handleHttpError = function (error) {
        console.log('handle http error @ note component', error);
        if (error.status == 400 || error.status == 401) {
            this.authenticationService.deleteToken();
            this.router.navigate(['login']);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', note_1.Note)
    ], NoteComponent.prototype, "note", void 0);
    NoteComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'note',
            templateUrl: 'note.component.html'
        }), 
        __metadata('design:paramtypes', [note_service_1.NoteService, authentication_service_1.AuthenticationService, router_1.ActivatedRoute, router_1.Router, common_1.Location])
    ], NoteComponent);
    return NoteComponent;
}());
exports.NoteComponent = NoteComponent;
//# sourceMappingURL=note.component.js.map