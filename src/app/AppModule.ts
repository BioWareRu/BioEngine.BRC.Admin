import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrcBlocksManagerFactory } from '@common/BrcBlocksManagerFactory';
import { AdsService } from '@services/AdsService';
import { PostTemplatesService } from '@services/PostTemplatesService';

import { OAuthModule, OAuthModuleConfig, OAuthStorage } from 'angular-oauth2-oidc';
import { BioCommonModule, BioStorageModule, BlocksManagerFactory, CreateFolderDialogComponent, RestClientOptions } from 'bioengine-angular';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ENV } from '../environments/environment';
import { DevelopersService } from '@services/DevelopersService';
import { ForumsService } from '@services/ForumsService';
import { GamesService } from '@services/GamesService';
import { TopicsService } from '@services/TopicsService';
import { AppRoutingModule } from './AppRoutingModule';
import { AppComponent } from './AppComponent';
import { authConfigFactory } from './AuthConfigFactory';
import { LayoutModule } from './layout/LayoutModule';
import { storageFactory } from './StorageFactory';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BioCommonModule,
        BioStorageModule,
        LayoutModule,

        // Material moment date module
        MatMomentDateModule,

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
        {
            provide: RestClientOptions,
            useFactory: () => {
                return new RestClientOptions(ENV.apiUrl);
            }
        },
        {
            provide: BlocksManagerFactory,
            useClass: BrcBlocksManagerFactory
        },
        DevelopersService,
        GamesService,
        TopicsService,
        PostTemplatesService,
        AdsService,
        ForumsService,
    ],
    entryComponents: [
        CreateFolderDialogComponent
    ]
})
export class AppModule {
}


