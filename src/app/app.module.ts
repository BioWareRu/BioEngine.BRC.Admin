import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatMenuModule} from '@angular/material';
import 'hammerjs';

import {OAuthModule, OAuthStorage} from 'angular-oauth2-oidc';


import {APP_BASE_HREF} from '@angular/common';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BioCommonModule} from './@common/BioCommonModule';
import {ServicesProvider} from './@services/ServicesProvider';
import {RestClient} from './@common/HttpClient';
import {SitesService} from './@services/SitesService';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng4-validators';
import {DevelopersService} from './@services/DevelopersService';
import {GamesService} from './@services/GamesService';
import {TopicsService} from './@services/TopicsService';
import {SectionsService} from './@services/SectionsService';
import {PostsService} from './@services/ContentService';
import {TagsService} from './@services/TagsService';
import {PagesService} from './@services/PagesService';
import {ForumsService} from './@services/ForumsService';
import {PropertiesService} from './@services/properties.service';
import {MenuService} from './@services/MenuService';
import {environment} from '../environments/environment';
import {LayoutModule} from './layout/layout.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,


        // OAuth
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: ['https://localhost:5031/v1'],
                sendAccessToken: true
            }
        }),

        // App modules
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        CustomFormsModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [environment.apiUrl],
                sendAccessToken: true,
            },
        }),

        MatIconModule,
        FormsModule,
        BioCommonModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        LayoutModule
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: OAuthStorage, useValue: localStorage},
        RestClient,
        SitesService,
        DevelopersService,
        GamesService,
        TopicsService,
        SectionsService,
        PostsService,
        TagsService,
        PagesService,
        ForumsService,
        PropertiesService,
        MenuService,
        ServicesProvider
    ],
})
export class AppModule {
}
