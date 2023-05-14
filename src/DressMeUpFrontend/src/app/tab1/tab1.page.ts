import { Component } from "@angular/core";
import { MyClothesComponent } from "../components/my-clothes-component/my-clothes-component/my-clothes-component.component";
import { ClothesService } from "../services/clothes.service";
import { Clothes } from "../interfaces/clothes";
import { PhotoService, UserPhoto } from "../services/photo.service";
import { CreateClothesComponent } from "../components/create-clothes/create-clothes.component";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  clothes: Clothes[] = [];

  constructor(
    private modalController: ModalController,
    private clothesService: ClothesService,
    public photoService: PhotoService,
  ) { }

  async ngOnInit() {
    console.log("getting data");
    this.clothesService
      .getAllclothes()
      .subscribe((data) => (this.clothes = data));
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
  }

  onClothesCardTapped(clothes: Clothes) {
    console.log(clothes);
  }

  async openPostForm() {
    const modal = await this.modalController.create({
      component: CreateClothesComponent,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
  }


}
