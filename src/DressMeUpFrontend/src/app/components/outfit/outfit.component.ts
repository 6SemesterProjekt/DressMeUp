import { Component, Input, OnInit } from '@angular/core';
import { IOutfit } from 'src/app/interfaces/outfit';
import { IClothes } from 'src/app/interfaces/clothes';

@Component({
  selector: 'outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss'],
})
export class OutfitComponent  implements OnInit {

  @Input() outfits : IOutfit;

  constructor() { }

  ngOnInit() {}

}
