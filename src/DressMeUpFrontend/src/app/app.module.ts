import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateClothesComponent } from './components/create-clothes/create-clothes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
  declarations: [AppComponent, CreateClothesComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule, SharedModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
