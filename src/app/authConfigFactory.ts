import { OAuthModuleConfig } from 'angular-oauth2-oidc';
import { ENV } from '../environments/environment';
export function authConfigFactory(): OAuthModuleConfig {
    return {
        resourceServer: {
            allowedUrls: [ENV.apiUrl],
            sendAccessToken: true
        }
    };
}
