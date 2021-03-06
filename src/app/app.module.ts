import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchUserComponent } from './search-user/search-user.component';

import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { GithubState } from './store/github.state';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from 'src/environments/environment.prod';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { CommitsDetailsComponent } from './commits-details/commits-details.component';
import { AlertButtonComponent } from './alert-button/alert-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchUserComponent,
    RepoDetailsComponent,
    CommitsDetailsComponent,
    AlertButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: SearchUserComponent },
      { path: 'repos/:repo', component: RepoDetailsComponent },
      { path: 'repos/:repo/commits', component: CommitsDetailsComponent },
      { path: '**',  redirectTo: '', pathMatch: 'full' },
    ]),
    NgxsModule.forRoot([
      GithubState
    ], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
