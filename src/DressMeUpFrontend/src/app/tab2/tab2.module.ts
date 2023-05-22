import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab2Page } from "./tab2.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";

import { Tab2PageRoutingModule } from "./tab2-routing.module";
import { OutfitComponent } from "../components/outfit/outfit.component";
import { SharedModule } from "../components/shared/shared.module";
import { OutfitClothComponent } from "../components/outfit-cloth/outfit-cloth.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    SharedModule
  ],
  declarations: [Tab2Page, OutfitComponent, OutfitClothComponent],
})
export class Tab2PageModule { }
