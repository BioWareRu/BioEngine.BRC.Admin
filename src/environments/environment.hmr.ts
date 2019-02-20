import { baseEnvironment } from './environment.base';

baseEnvironment.hmr = true;
baseEnvironment.oauth.clientId = 'admin';
baseEnvironment.apiUrl = 'https://localhost:5001/v1/';

export const environment = baseEnvironment;
