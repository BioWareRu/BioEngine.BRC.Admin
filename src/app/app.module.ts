import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatMenuModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OAuthModule, OAuthModuleConfig, OAuthStorage } from 'angular-oauth2-oidc';
import 'hammerjs';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ENV } from '../environments/environment';
import { BioCommonModule } from '@common/BioCommonModule';
import { RestClient } from '@common/HttpClient';
import { PostsService } from '@services/ContentService';
import { DevelopersService } from '@services/DevelopersService';
import { ForumsService } from '@services/ForumsService';
import { GamesService } from '@services/GamesService';
import { MenuService } from '@services/MenuService';
import { PagesService } from '@services/PagesService';
import { PropertiesService } from '@services/properties.service';
import { SectionsService } from '@services/SectionsService';
import { ServicesProvider } from '@services/ServicesProvider';
import { SitesService } from '@services/SitesService';
import { TagsService } from '@services/TagsService';
import { TopicsService } from '@services/TopicsService';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';

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
                allowedUrls: [ENV.apiUrl],
                sendAccessToken: true
            }
        }),

        // App modules
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        CustomFormsModule,
        OAuthModule.forRoot(),

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
        {
            provide: OAuthModuleConfig,
            useFactory: authConfigFactory
        },
        {
            provide: OAuthStorage,
            useFactory: storageFactory
        },
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
    ]
})
export class AppModule {
}

export function authConfigFactory(): OAuthModuleConfig {
    return {
        resourceServer: {
            allowedUrls: [ENV.apiUrl],
            sendAccessToken: true
        }
    };
}

export function storageFactory(): OAuthStorage {
    return localStorage;
}
