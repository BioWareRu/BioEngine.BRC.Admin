import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { navigation } from './navigation';
import { NavigationItem } from './@common/navigation/NavigationItem';
import { MatIconRegistry } from '@angular/material';

@Component({
    selector: 'ngx-app',
    template: `
        <app-layout [navigation]="navigation"></app-layout>
    `,
    styles: [
        `
            :host {
                position: relative;
                display: flex;
                flex: 1 1 auto;
                width: 100%;
                height: 100%;
                min-width: 0;
            }
        `
    ]
})
export class AppComponent implements OnInit {
    public navigation: NavigationItem[];

    constructor(private oauthService: OAuthService, matIconRegistry: MatIconRegistry) {
        this.oauthService.configure(authConfig);
        this.oauthService.setupAutomaticSilentRefresh();
        this.navigation = navigation;

        matIconRegistry.registerFontClassAlias('fa');
        matIconRegistry.registerFontClassAlias('fas');
        matIconRegistry.registerFontClassAlias('far');
        matIconRegistry.registerFontClassAlias('fab');
    }

    ngOnInit(): void {
        this.oauthService.tryLogin().then(
            () => {
                if (this.oauthService.hasValidAccessToken()) {
                } else {
                    this.oauthService.initImplicitFlow();
                }
            },
            () => {
                location.reload();
            }
        );
    }
}
