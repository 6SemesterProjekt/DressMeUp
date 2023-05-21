param(

    [string]$storageAccountName,
    [string]$storageSasToken,
    [string]$apiBaseUrl,
    [string]$storageConnectionString
)

cd..
cd..
cd src/DressMeUpFrontend/src/environments

$content = @"
export const environment = {
  production: true,
  apiBaseUrl: `"$apiBaseUrl`",
  azureStorageAccountName: `"$storageAccountName`",
  storageAccountSasToken: `"$storageSasToken`",
  storageConnectionString: `"$storageConnectionString`"
};
"@

$file = "environment.prod.ts"


Set-Content -Path $file -Value $content