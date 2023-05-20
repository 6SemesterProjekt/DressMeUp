import { AfterViewInit, Component, OnInit } from "@angular/core";
import { OutfitsService } from "../services/outfits.service";
import { IOutfit } from "../interfaces/outfit";
import { IClothes } from "../interfaces/clothes";
import { OutfitClothesService } from "../services/outfit-clothes.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  outfits: IOutfit[] = [];

  clothesHats: string[] = [
    "../../assets/Images/png/hat-1.png",
    "../../assets/Images/png/hat-2.png",
    "../../assets/Images/png/sunglasses.png",
  ];
  clothesJackets: string[] = [
    "../../assets/Images/png/1-jacket.png",
    "../../assets/Images/png/2-jacket.png",
    "../../assets/Images/png/3-jacket.png",
  ];
  clothesShirts: string[] = [
    "../../assets/Images/png/sort-tshirt.png",
    "../../assets/Images/png/beige-tshirt.png",
    "../../assets/Images/png/blue-tshirt.png",
    "../../assets/Images/png/light-blue-tshirt.png",
    "../../assets/Images/png/green-tshirt.png",
  ];
  clothesPants: string[] = [
    "../../assets/Images/png/natur-pants.png",
    "../../assets/Images/png/black-pants.png",
    "../../assets/Images/png/1-shorts.png",
    "../../assets/Images/png/2-shorts.png",
  ];
  clothesShoes: string[] = [
    "../../assets/Images/png/1-shoe.png",
    "../../assets/Images/png/2-shoe.png",
    "../../assets/Images/png/3-shoe.png",
  ];

  constructor(
    private outfitService: OutfitsService,
    private outfitClothesService: OutfitClothesService
  ) {
    // The `true` above ensures that callbacks run inside NgZone.
  }
  async ngOnInit() {
    console.log("getting data");
    this.outfitService
      .getAllOutfits()
      .subscribe((data) => (this.outfits = data));
  }

  onOutfitCardTapped(outfit: IOutfit) {
    console.log(outfit);
  }
}
