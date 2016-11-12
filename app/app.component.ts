import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
 //   template: 'what the very fuck'
})

export class AppComponent {
    title = 'SykeNote';
    jwtToken: String;
}
