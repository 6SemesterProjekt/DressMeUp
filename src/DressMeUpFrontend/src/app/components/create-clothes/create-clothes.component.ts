import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ActionSheetController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { IClothes } from "src/app/interfaces/clothes";
import { ClothesService } from "src/app/services/clothes.service";
import { PhotoService, UserPhoto } from "src/app/services/photo.service";

@Component({
  selector: "app-create-clothes",
  templateUrl: "./create-clothes.component.html",
  styleUrls: ["./create-clothes.component.scss"],
})
export class CreateClothesComponent implements OnInit {
  //@Output() formSubmit = new EventEmitter();

  postForm: FormGroup;
  photo: string;
  photos: UserPhoto[];

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    public toastController: ToastController,
    private clothesService: ClothesService,
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController) {

    this.postForm = this.formBuilder.group({
      id: 0,
      clothesType: [null, Validators.required],
      color: [null],
      fabric: [null],
      seasons: [null],
      filterTags: [null],
      brand: [""],
      image: [""],
      name: ["", Validators.required],
    });
  }

  ngOnInit() { }

  async onSubmit() {
    console.log(this.postForm)
    let url = await this.photoService.uploadPictureToSotrage();
    console.log('Component: ' + url)
    const newCloth: IClothes = {
      Id: 0,
      ClothesType: this.postForm.value.clothesType,
      Color: [this.postForm.value.color],
      Fabric: [this.postForm.value.fabric],
      Seasons: [this.postForm.value.seasons],
      FilterTags: [this.postForm.value.filterTags],
      Brand: this.postForm.value.brand,
      Image: url,
      Name: this.postForm.value.name,      
      CreatedAt: "2023-06-17",
      UpdatedAt: "2023-06-18"
    };
    console.log(newCloth)
    this.clothesService.createNewItem(newCloth).subscribe((i) => {
      if (i) {
        console.log(i);

      }
    });

    // close the modal if succes
    this.presentToast();
    this.modalController.dismiss(null, "succes");
  }

  onCancel() {
    this.modalController.dismiss(null, "cancel");
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Tøj oprettet!",
      duration: 2000, // milliseconds
      position: "top", // 'top', 'middle', or 'bottom'
    });
    toast.present();
  }

  addPhotoToGallery() {

    this.photoService.getPictureForClothes()
      .then(res => {
        console.log(res);
        this.photo = 'data:image/png;base64,' + res;
      });

  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: "Photos",
      buttons: [
        {
          text: "Delete",
          role: "destructive",
          icon: "trash",
          handler: () => {
            this.photoService.deletePicture(photo, position);
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
