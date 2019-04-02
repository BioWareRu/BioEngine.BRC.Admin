import { BASE_ENV } from './environment.base';

BASE_ENV.hmr = true;
BASE_ENV.oauth.clientId = '97c774ef826a0b642f3d4fc9c802fe84';
BASE_ENV.apiUrl = 'https://localhost:5001/v1/';

export const ENV = BASE_ENV;
