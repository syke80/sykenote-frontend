import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { AppMenuComponent } from './appMenu/appMenu.component';
import { NotelistPageComponent }  from './notelistPage/notelistPage.component';
import { NotePageComponent }  from './notePage/notePage.component';
import { HelpPageComponent }  from './helpPage/helpPage.component';
import { LoginPageComponent } from './loginPage/loginPage.component';
import { LoginFormComponent }  from './loginPage/loginForm/loginForm.component';
import { AddNoteComponent }  from './addNote/addNote.component';
import { RegistrationFormComponent } from './loginPage/registrationForm/registrationForm.component';
import { NoteService } from './note.service';
import { ConfigService } from './config.service';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports:      [
      BrowserModule,
      HttpModule,
      routing,
      FormsModule
  ],
  declarations: [
      AppComponent,
      AppMenuComponent,
      NotelistPageComponent,
      NotePageComponent,
      HelpPageComponent,
      LoginPageComponent,
      LoginFormComponent,
      AddNoteComponent,
      RegistrationFormComponent
  ],
  providers: [
      NoteService,
      AuthenticationService,
      ConfigService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
