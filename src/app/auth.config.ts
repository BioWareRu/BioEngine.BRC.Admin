import { AuthConfig } from 'angular-oauth2-oidc';
import { ENV } from '../environments/environment';

export const AUTH_CONFIG: AuthConfig = {
    oidc: false,
    loginUrl: ENV.oauth.loginUrl,
    tokenEndpoint: ENV.oauth.tokenEndpoint,
    userinfoEndpoint: ENV.oauth.userinfoEndpoint,
    redirectUri: ENV.oauth.redirectUri,
    clientId: ENV.oauth.clientId,
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
    scope: ENV.oauth.scope
};
