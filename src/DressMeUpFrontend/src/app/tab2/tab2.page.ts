import { AfterViewInit, Component, OnInit } from "@angular/core";
import { OutfitsService } from "../services/outfits.service";
import { IOutfit } from "../interfaces/outfit";
import { IClothes } from "../interfaces/clothes";
import { OutfitClothesService } from "../services/outfit-clothes.service";
import { ClothesService } from "../services/clothes.service";
import { Observable, map } from "rxjs";
import { resolve } from "dns";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  outfits: IOutfit[] = [];

  clothesHats: IClothes[] = null;
  clothesJackets: IClothes[] = null;
  clothesShirts: IClothes[] = null;
  clothesPants: IClothes[] = null;
  clothesShoes: IClothes[] = null;

  constructor(
    private outfitService: OutfitsService,
    private clothesService: ClothesService
  ) {
    // The `true` above ensures that callbacks run inside NgZone.
  }
  async ngOnInit() {
    console.log("getting data");
    this.outfitService
      .getAllOutfits()
      .subscribe((data) => (this.outfits = data));
    this.clothesService.getClothesByType("1").subscribe(clothes => { this.clothesHats = clothes as IClothes[] })
    this.clothesService.getClothesByType("2").subscribe(clothes => { this.clothesJackets = clothes as IClothes[] });
    this.clothesService.getClothesByType("3").subscribe(clothes => { this.clothesShirts = clothes as IClothes[] });
    this.clothesService.getClothesByType("4").subscribe(clothes => { this.clothesPants = clothes as IClothes[] });
    this.clothesService.getClothesByType("5").subscribe(clothes => { this.clothesShoes = clothes as IClothes[] });
  }

  onOutfitCardTapped(outfit: IOutfit) {
    console.log(outfit);
  }
}
