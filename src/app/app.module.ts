import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HighlightModule, HIGHLIGHT_OPTIONS, HighlightOptions  } from 'ngx-highlightjs';
import { MomentModule } from 'ngx-moment';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { PanelModule } from './panel/panel.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { UsersComponent } from './components/users/users.component';

import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    TopicsComponent,
    TopicDetailComponent,
    UsersComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HighlightModule,
    MomentModule,
    NgxUploaderModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    PanelModule
  ],
  providers: [
    appRoutingProviders,
    UserGuard,
    UserService,
    NoIdentityGuard,
  	{
      provide: HIGHLIGHT_OPTIONS,
      useValue:{
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
