import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const authConfig: AuthConfig = {

  oidc: false,
  loginUrl: 'https://forum.bioware.ru/oauth/authorize/',
  tokenEndpoint: 'https://forum.bioware.ru/oauth/token/',
  userinfoEndpoint: 'https://forum.bioware.ru/api/core/me/',
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',
  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: environment.oauthClientId,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'profile email',
}
