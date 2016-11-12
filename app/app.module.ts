import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { NotelistComponent }  from './notelist/notelist.component';
import { NoteComponent }  from './note.component';
import { HelpComponent }  from './help.component';
import { LoginComponent }  from './login.component';
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
      NotelistComponent,
      NoteComponent,
      HelpComponent,
      LoginComponent
  ],
  providers: [
      NoteService,
      AuthenticationService,
      ConfigService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
