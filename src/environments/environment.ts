// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { BASE_ENV } from './environment.base';

BASE_ENV.oauth.clientId = '97c774ef826a0b642f3d4fc9c802fe84';
BASE_ENV.apiUrl = 'https://localhost:5001/v1/';

export const ENV = BASE_ENV;

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
