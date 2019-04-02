import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { OAuthService } from 'angular-oauth2-oidc';
import { NavigationItem } from '@common/navigation/NavigationItem';
import { AUTH_CONFIG } from './auth.config';
import { NAVIGATION } from './navigation';

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
    public navigation: Array<NavigationItem>;

    constructor(private readonly _oauthService: OAuthService, matIconRegistry: MatIconRegistry) {
        this._oauthService.configure(AUTH_CONFIG);
        this._oauthService.setupAutomaticSilentRefresh();
        this.navigation = NAVIGATION;

        matIconRegistry.registerFontClassAlias('fa');
        matIconRegistry.registerFontClassAlias('fas');
        matIconRegistry.registerFontClassAlias('far');
        matIconRegistry.registerFontClassAlias('fab');
    }

    ngOnInit(): void {
        this._oauthService.tryLogin().then(
            () => {
                if (this._oauthService.hasValidAccessToken()) {
                } else {
                    this._oauthService.initImplicitFlow();
                }
            },
            () => {
                location.reload();
            }
        );
    }
}
