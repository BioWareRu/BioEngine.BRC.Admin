import {baseEnvironment} from './environment.base';

baseEnvironment.hmr = false;
baseEnvironment.production = true;
baseEnvironment.apiUrl = 'https://api.brcgames.ru/v1';
baseEnvironment.oauth.clientId = 'admin';

export const environment = baseEnvironment;

