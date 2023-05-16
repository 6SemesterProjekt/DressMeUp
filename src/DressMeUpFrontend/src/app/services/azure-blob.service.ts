import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { environment } from 'src/environments/environment';

const CONTAINER_NAME = 'photos';
const STORAGE_CONNECTION_STRING = environment.storageConnectionString;
const STORAGE_ACCOUNT_NAME = environment.azureStorageAccountName;

@Injectable({
  providedIn: 'root'
})
export class AzureBlobService {

  container : ContainerClient;

  constructor() { 
    this.init();
  }

  init() {
    const blobServiceClient = BlobServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);
    this.container = blobServiceClient.getContainerClient(CONTAINER_NAME);
  }

  async uploadPhoto(blob : Blob) : Promise<string> {
    let newBlobName = `photo${new Date().getTime()}`;
    this.container.uploadBlockBlob(newBlobName, blob, blob.size)
    .then(
      response=> {
        let blobUrl = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${CONTAINER_NAME}/${newBlobName}`;
        console.log(blobUrl);
        return blobUrl;
      }
    )
    .catch(error=>{
      console.log(error);
    });
    return "";
  }
}
