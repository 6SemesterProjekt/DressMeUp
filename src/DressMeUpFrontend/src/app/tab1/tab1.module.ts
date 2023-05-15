import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { MyClothesComponent } from '../components/my-clothes-component/my-clothes-component/my-clothes-component.component';
import { SharedModule } from '../components/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    SharedModule
  ],
  declarations: [Tab1Page, MyClothesComponent]
})
export class Tab1PageModule {}
