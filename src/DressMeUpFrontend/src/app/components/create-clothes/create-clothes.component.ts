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
  @Output() formSubmit = new EventEmitter();

  postForm: FormGroup;
  photo: string;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    public toastController: ToastController,
    private clothesService: ClothesService,
    public photoService: PhotoService,

    public actionSheetController: ActionSheetController
  ) {
    this.postForm = this.formBuilder.group({
      clothesType: ["", Validators.required],
      color: ["", Validators.required],
      fabric: ["", Validators.required],
      seasons: ["", Validators.required],
      filterTags: ["", Validators.required],
      brand: ["", [Validators.required, Validators.minLength(2)]],
      image: ["", Validators.required],
      name: ["", Validators.required],
    });
  }

  /*   "clothesType": 1, 
    "color": "ffffff",
    "fabric": "uld",
    "seasons": "Vinter",
    "filterTags": "T-shirt",
    "brand": "Nike",
    "image": "img.png",
    "name": "sorte sko" */

  ngOnInit() {}

  onSubmit() {
    const newCloth: IClothes = {
      ClothesType: /* this.postForm.value.clothesType */ 1,
      Color: /* this.postForm.value.color */ [1],
      Fabric: /* this.postForm.value.fabric */ [1],
      Seasons: /* this.postForm.value.seasons */ [1],
      FilterTags: /* this.postForm.value.filterTags */ [1],
      Brand: /* this.postForm.value.brand */ "Nike",
      Image: this.photo,
      Name: /* this.postForm.value.name */ "Some t-shirt",
    };

    this.clothesService.createNewItem(newCloth).subscribe((i) => {
      if (i) {
        console.log(i);
      }
    });

    // close the modal if succes
    this.modalController.dismiss(null, "succes");
  }

  onCancel() {
    this.modalController.dismiss(null, "cancel");
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Tøj oprettet!",
      duration: 3000, // milliseconds
      position: "top", // 'top', 'middle', or 'bottom'
    });
    toast.present();
  }

  addPhotoToGallery() {
    this.photoService
      .addNewToGallery()
      .then((response) => (this.photo = response));
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
