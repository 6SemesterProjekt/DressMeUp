import { Component } from '@angular/core';
import { MyClothesComponent } from '../components/my-clothes-component/my-clothes-component/my-clothes-component.component';
import { ClothesService } from '../services/clothes.service';
import { Clothes } from '../interfaces/clothes';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  clothes : Clothes[] = [];

  constructor(private clothesService:ClothesService) {}

  async ngOnInit(){
    console.log('getting data')
    this.clothesService
      .getAllclothes()
      .subscribe(
        data=>this.clothes = data
      )
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
  }

  onClothesCardTapped(clothes : Clothes){
    console.log(clothes)
  }
}
