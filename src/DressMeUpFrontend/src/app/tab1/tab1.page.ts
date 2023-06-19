import { Component } from "@angular/core";
import { MyClothesComponent } from "../components/my-clothes-component/my-clothes-component/my-clothes-component.component";
import { ClothesService } from "../services/clothes.service";
import { IClothes } from "../interfaces/clothes";
import { CreateClothesComponent } from "../components/create-clothes/create-clothes.component";
import { ModalController } from "@ionic/angular";
import { ClothesType } from "../interfaces/clothes";
import { ClothesDetailComponent } from "../components/clothes-detail/clothes-detail.component";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  filterOptions = [
    "Alle",
    "Overtøj",
    "Overdele",
    "Underdele",
    "Accessoires",
    "Sko",
  ];
  searchCriteria: string = "";
  selectedFilter: string = "Alle";
  clothes: IClothes[] = [];

  constructor(
    private modalController: ModalController,
    private clothesService: ClothesService,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    this.clothesService
      .getAllclothes()
      .subscribe((data) => (this.clothes = data));
  }

  onSearchBarChanged(event) {
    this.searchCriteria = event.target.value.toLowerCase();
  }

  getClothes() {
    return this.clothes
      .filter((c) => c.Name.toLocaleLowerCase().includes(this.searchCriteria))
      .filter((c) =>
        this.selectedFilter != "Alle"
          ? c.ClothesType == ClothesType[this.selectedFilter]
          : c
      );
  }

  async onClothesCardTapped(clothes: IClothes) {
    await this.openClothesDetailModal(clothes);
  }

  async openClothesDetailModal(clothes: IClothes) {
    const modal = await this.modalController.create({
      component: ClothesDetailComponent,
      cssClass: 'create-clothes-modal',
      componentProps: {
        clothes: clothes
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data.clothDeleted == true) {
      this.clothesService
        .getAllclothes()
        .subscribe((data) => (this.clothes = data));
    }
  }

  async openPostForm() {
    const modal = await this.modalController.create({
      component: CreateClothesComponent,
      cssClass: 'create-clothes-modal'
    });
    await modal.present();
    await modal.onDidDismiss().then((output) => {
      this.clothesService
        .getAllclothes()
        .subscribe((data) => (this.clothes = data));
    });
  }




}
