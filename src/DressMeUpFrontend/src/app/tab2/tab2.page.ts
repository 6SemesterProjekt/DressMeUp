import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OutfitsService } from '../services/outfits.service';
import { IOutfit } from '../interfaces/outfit';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  outfits: IOutfit[] = [];

  currentIndex = 0;
  imagePaths: string[] = [
    '../../assets/Images/png/1-jacket.png',
    '../../assets/Images/png/2-jacket.png',
    '../../assets/Images/png/3-jacket.png'];

  constructor(private outfitService: OutfitsService) {

    // The `true` above ensures that callbacks run inside NgZone.
  }


  async ngOnInit() {
    console.log('getting data')
    this.outfitService
      .getAllOutfits()
      .subscribe(
        data => this.outfits = data
      )
  }

  onOutfitCardTapped(outfit: IOutfit) {
    console.log(outfit)
  }

}
