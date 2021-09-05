import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Add Amplify imports */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import { JwtInterceptor } from './shared/jwt.interceptor';

import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './register/register.component';
import { ValidateComponent } from './validate/validate.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { RegisteredUserComponent } from './registered-user/registered-user.component';
import { RduserLstDialogComponent } from './rduser-lst-dialog/rduser-lst-dialog.component';
import { Page404Component } from './page404/page404.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    ValidateComponent,
    ListUsersComponent,
    RegisteredUserComponent,
    RduserLstDialogComponent,
    Page404Component,
  ],
  imports: [
    AmplifyUIAngularModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    /* Configure Amplify resources */
    Amplify.configure({
      region: 'us-east-1',
      userPoolId: environment.userPoolId,
      userPoolWebClientId: environment.userPoolWebClientId,
    });
  }
}
