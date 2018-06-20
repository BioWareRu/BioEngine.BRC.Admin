/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OAuthModule, OAuthStorage} from 'angular-oauth2-oidc'
import {BioCommonModule} from './@common/BioCommonModule';
import {ServicesProvider} from './@services/ServicesProvider';
import {PostsService} from './@services/PostsService';
import {RestClient} from './@common/HttpClient';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:5000/v1'],
        sendAccessToken: true,
      },
    }),

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

    BioCommonModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: OAuthStorage, useValue: localStorage},
    RestClient,
    PostsService,
    ServicesProvider,
  ],
})
export class AppModule {
}
