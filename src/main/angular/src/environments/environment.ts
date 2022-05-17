// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IProfile } from "src/app/interfaces/entities";

export const environment = {
  production: false,
  API_URL: '',
};

export const constants = {
  SESSION: 'session',
  MODULE: 'module',
  ROLE_USER: 'ROLE_USER',
  ROLE_ADMIN: 'ROLE_ADMIN'
}

export const profiles: Array<IProfile> = [
  { role: constants.ROLE_USER, description: 'Usuario' },
  { role: constants.ROLE_ADMIN, description: 'Administrador' }
];

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
