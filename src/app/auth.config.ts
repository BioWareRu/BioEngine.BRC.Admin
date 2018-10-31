import {AuthConfig} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';

export const authConfig: AuthConfig = {
    oidc: false,
    loginUrl: environment.oauth.loginUrl,
    tokenEndpoint: environment.oauth.tokenEndpoint,
    userinfoEndpoint: environment.oauth.userinfoEndpoint,
    redirectUri: environment.oauth.redirectUri,
    clientId: environment.oauth.clientId,
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
    scope: environment.oauth.scope,
};
