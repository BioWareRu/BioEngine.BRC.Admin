import { baseEnvironment } from './environment.base';

baseEnvironment.hmr = false;
baseEnvironment.production = true;
baseEnvironment.apiUrl = 'https://api.brcgames.ru/v1/';
baseEnvironment.oauth.clientId = '8a7af1cc352af495fa0d95e7f3aed182';

export const environment = baseEnvironment;

