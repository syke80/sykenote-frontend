import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { AppMenuComponent } from './components/appMenu/appMenu.component';
import { NoteListComponent }  from './components/noteList/noteList.component';
import { NotePageComponent }  from './components/notePage/notePage.component';
import { HelpPageComponent }  from './components/helpPage/helpPage.component';
import { LoginPageComponent } from './components/loginPage/loginPage.component';
import { LoginFormComponent }  from './components/loginPage/loginForm/loginForm.component';
import { AddNoteComponent }  from './components/addNote/addNote.component';
import { UserInfoComponent }  from './components/userInfo/userInfo.component';
import { NoteDetailsComponent }  from './components/noteDetails/noteDetails.component';
import { RegistrationFormComponent } from './components/loginPage/registrationForm/registrationForm.component';
import { NoteService } from './services/note.service';
import { ConfigService } from './services/config.service';
import { AuthenticationService } from './services/authentication.service';

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
      NoteListComponent,
      NotePageComponent,
      HelpPageComponent,
      LoginPageComponent,
      LoginFormComponent,
      AddNoteComponent,
      UserInfoComponent,
      NoteDetailsComponent,
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
