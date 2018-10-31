import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './auth.config';
import {navigation} from './navigation';
import {NavigationItem} from './@common/navigation/NavigationItem';

@Component({
    selector: 'ngx-app',
    template: `
        <app-layout [navigation]="navigation"></app-layout>`,
    styles: [`
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

    constructor(private oauthService: OAuthService) {
        this.oauthService.configure(authConfig);
        this.oauthService.setupAutomaticSilentRefresh();
        this.navigation = navigation;
    }

    ngOnInit(): void {
        this.oauthService.tryLogin().then(() => {
            if (this.oauthService.hasValidAccessToken()) {
            } else {
                this.oauthService.initImplicitFlow();
            }
        }, () => {
            location.reload();
        });
    }
}
