// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  corporateId: '',
  basePath: 'https://ecbill.net/ecerpv2_alpha_api/api/',
  imagePath: '/',
  orgLogoPath: '/',
  baseAppPath: '/',
  encrypt: true,
  maxFileSize: 3145728,
  fileSizeErrorMsg: 'Upload File size Below 3 MB',
  fileAccept: 'application/pdf, image/*',
  serverDateFormat: 'dd MMM yyyy',
  serverDateFormatWithTime: 'dd MMM yyyy hh:mm a',
  dateViewFormat: 'dd MMM yyyy',
  dateViewFormatWithTime: 'dd MMM yyyy HH:mm',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
