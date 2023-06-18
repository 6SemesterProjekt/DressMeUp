import { NgModule } from "@angular/core";
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig,
} from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreateClothesComponent } from "./components/create-clothes/create-clothes.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ClothesDetailComponent } from "./components/clothes-detail/clothes-detail.component";
import { DeleteClothModalPageComponent } from "./components/delete-cloth-modal-page/delete-cloth-modal-page.component";
//import { OutfitClothComponent } from "./components/outfit-cloth/outfit-cloth.component";


@NgModule({
  declarations: [AppComponent, CreateClothesComponent, ClothesDetailComponent, DeleteClothModalPageComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
