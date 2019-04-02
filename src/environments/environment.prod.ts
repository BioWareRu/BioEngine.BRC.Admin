import { BASE_ENV } from './environment.base';

BASE_ENV.hmr = false;
BASE_ENV.production = true;
BASE_ENV.apiUrl = 'https://api.brcgames.ru/v1/';
BASE_ENV.oauth.clientId = '8a7af1cc352af495fa0d95e7f3aed182';

export const ENV = BASE_ENV;
