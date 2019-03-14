import { baseEnvironment } from './environment.base';

baseEnvironment.hmr = true;
baseEnvironment.oauth.clientId = '97c774ef826a0b642f3d4fc9c802fe84';
baseEnvironment.apiUrl = 'https://localhost:5001/v1/';

export const environment = baseEnvironment;
