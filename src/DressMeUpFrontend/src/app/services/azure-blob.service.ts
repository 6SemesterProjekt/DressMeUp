import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { environment } from 'src/environments/environment';

const CONTAINER_NAME = 'photos';
const STORAGE_CONNECTION_STRING = environment.storageConnectionString;
const STORAGE_ACCOUNT_NAME = environment.azureStorageAccountName;
const SAS_TOKEN = environment.storageAccountSasToken;

@Injectable({
  providedIn: 'root'
})
export class AzureBlobService {

  container : ContainerClient;

  constructor() { 
    
  }

  init() {
    let connectionUrl = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${SAS_TOKEN}`;
    const blobServiceClient = new BlobServiceClient(connectionUrl);
    this.container = blobServiceClient.getContainerClient(CONTAINER_NAME);
  }

  async uploadPhoto(blob : Blob) : Promise<string> {
    let newBlobName = `photo${new Date().getTime()}.jpg`;
    await this.container.uploadBlockBlob(newBlobName, blob, blob.size);

    let blobUrl = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${CONTAINER_NAME}/${newBlobName}`;
    console.log('blob service' + blobUrl);
    return blobUrl;
  }
}
