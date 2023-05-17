import { Component } from '@angular/core';
import { OutfitsService } from '../services/outfits.service';
import { IOutfit } from '../interfaces/outfit';
import { OutfitComponent } from '../components/outfit/outfit.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  outfits : IOutfit[] = [];

  constructor(private outfitService:OutfitsService) {}

  async ngOnInit(){
    console.log('getting data')
    this.outfitService
      .getAllOutfits()
      .subscribe(
        data=>this.outfits = data
      )
  }

  onOutfitCardTapped(outfit : IOutfit){
    console.log(outfit)
  }

}
