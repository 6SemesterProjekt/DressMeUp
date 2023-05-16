// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: "http://localhost:8080/api",
  azureSasToken: "sp=racwdli&st=2023-05-15T12:35:48Z&se=2023-06-30T20:35:48Z&sv=2022-11-02&sr=c&sig=ajUKF0aEUr7p%2FzGgNJDa3YY3xzHolKIgXnY%2FlGhLvjI%3D",
  azureStorageAccountName: "saphotostest",
  storageConnectionString: "DefaultEndpointsProtocol=https;AccountName=saphotostest;AccountKey=d+xYXToUODiJfXNXJc/LfSSQqgkZvX7QGgrMWJT0YZXnj3a8QW+evmRfyM5hFknBvPlZeiGA8MDa+AStyi1/JQ==;EndpointSuffix=core.windows.net"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
