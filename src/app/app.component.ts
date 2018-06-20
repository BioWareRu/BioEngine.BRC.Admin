/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
  }

  ngOnInit() {
    this.oauthService.tryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
      } else {
        this.oauthService.initImplicitFlow();
      }
    }, (e) => {
      location.reload();
    });

    this.analytics.trackPageViews();
  }
}
