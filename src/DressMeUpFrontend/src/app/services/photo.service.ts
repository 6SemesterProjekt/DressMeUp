import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AzureBlobService } from './azure-blob.service';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photo: Blob;
  capturedPhoto: Photo;
  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';
  private platform: Platform;
  base64photo: string;

  constructor(platform: Platform, private blobService: AzureBlobService) {
    this.platform = platform;
  }

  async getPictureForClothes() {
    this.capturedPhoto = await this.takePicture();
    this.photo = await this.convertPictureToBlob(this.capturedPhoto)
    //await this.addNewToGallery();
    return this.capturedPhoto.base64String;
  }

  async takePicture() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });
    return capturedPhoto;
  }

  async convertPictureToBlob(photo: Photo) {
    var byteString = atob(photo.base64String);

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: 'image/png' });
  }

  async uploadPictureToSotrage() {
    let url = await this.blobService.uploadPhoto(this.photo);
    return url;
  }



  /*   makeImageToBlob(base64Image: string) {
    const buffer = Buffer.from(base64Image, 'base64');
    const blob = new Blob([buffer]);
    return blob;
  } */
  /*  uploadImage(base64Image: string) {
     const apiUrl = environment.apiBaseUrl +'/upload-image'; // Replace with your API endpoint
   
     const payload = {
       image: base64Image
     };
   
     return this.http.post(apiUrl, payload);
   } */

  public async addNewToGallery() {
    // Take a photo
    // const capturedPhoto = await Camera.getPhoto({
    //   resultType: CameraResultType.Uri,
    //   source: CameraSource.Camera,
    //   quality: 100
    // });

    let capturedPhoto = this.capturedPhoto;

    //console.log(capturedPhoto.webPath);
    const response = await fetch(capturedPhoto.webPath!);
    const blob = await response.blob();
    //console.log(blob);
    let f = await this.readAsBase64(capturedPhoto);
    console.log(f)
    this.base64photo = f;

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath

    });

    //return blob;
    //return capturedPhoto.webPath.toString();
  }

  public async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path as string
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  // Test of blob to image
  public async blobToImage(photo: Photo) {

    // Retrieve cached photo array data
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];



    // Easiest way to detect when running on the web:
    // “when the platform is NOT hybrid, do this”
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {


        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/png;base64,${photo}`;
      }
    }
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  // Save picture to file on device
  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      };
    }
  }

  // NEW FUNC Delte - Mark
  public async deletePicture(photo: UserPhoto, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });

    // delete photo file from filesystem
    const filename = photo.filepath
      .substr(photo.filepath.lastIndexOf('/') + 1);

    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data
    });
  }

  public async loadSaved() {
    // Retrieve cached photo array data
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];

    // Easiest way to detect when running on the web:
    // “when the platform is NOT hybrid, do this”
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data
        });

        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

}
