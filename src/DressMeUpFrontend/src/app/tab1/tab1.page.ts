import { Component } from "@angular/core";
import { MyClothesComponent } from "../components/my-clothes-component/my-clothes-component/my-clothes-component.component";
import { ClothesService } from "../services/clothes.service";
import { IClothes } from "../interfaces/clothes";
import { PhotoService, UserPhoto } from "../services/photo.service";
import { CreateClothesComponent } from "../components/create-clothes/create-clothes.component";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  filterOptions = ['Alle', 'Overdel', 'Underdel', 'T-shirt', 'Hatte', 'Sko'];
  selectedFilter: string;



  clothes: IClothes[] = [];

  constructor(
    private modalController: ModalController,
    private clothesService: ClothesService,
    public photoService: PhotoService
  ) { }

  async ngOnInit() {
    console.log("getting data");
    this.clothesService
      .getAllclothes()
      .subscribe((data) => (this.clothes = data));
  }

  applyFilter() {
    console.log('Selected filter:', this.selectedFilter);
    // Perform filtering or any other actions based on the selected filter
  }






  handleInput(event) {
    const query = event.target.value.toLowerCase();
  }

  onClothesCardTapped(clothes: IClothes) {
    console.log(clothes);
  }

  async openPostForm() {
    const modal = await this.modalController.create({
      component: CreateClothesComponent,
    });
    await modal.present();
    await modal.onDidDismiss().then(output => {
      this.clothesService
        .getAllclothes()
        .subscribe((data) => (this.clothes = data));
    });
  }
}
